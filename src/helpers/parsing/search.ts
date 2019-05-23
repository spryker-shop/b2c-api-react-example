import {
    IFilterValue,
    ICatalogSearchDataParsed,
    IValueFacets,
    TActiveFilters,
    TActiveRangeFilters
} from '@interfaces/search';
import { rangeMaxType, rangeMinType } from '@constants/search';
import { rangeFilterValueToFront } from '@helpers/common';
import { getProductLabel, getAvailableLables, parsePrices } from '@helpers/parsing/common';
import { IProductCard } from '@interfaces/product';
import {
    TProductRowResponseIncluded,
    IProductLabelsCollectionResponse,
    IProductAvailableLabelResponse
} from '@services/pages/Product/types';
import {
    ICatalogSearchRawResponse,
    ICatalogSearchRowIncludedResponse,
    IProductCardResponse
} from '@services/pages/Search/types';
import { ISuggestionSearchRawResponse } from '@services/common/Search/types';

export const parseCatalogSearchResponse = (response: ICatalogSearchRawResponse): ICatalogSearchDataParsed | null => {
    if (!response) {
        return null;
    }

    const { data, included }: ICatalogSearchRawResponse = response;

    if (!data || !data[0]) {
        return null;
    }

    const attributes = data[0].attributes;
    const pagination = attributes.pagination;
    const filters: IValueFacets[] = [];
    const activeFilters: TActiveFilters = {};
    const activeRangeFilters: TActiveRangeFilters = {};
    const currentSort: string = attributes.sort.currentSortParam || ' ';
    const currentPaginationPage: number = pagination.currentPage;
    let category: IFilterValue[] = [];
    let currentCategoryId: number = null;
    let categoriesLocalizedName: string | null = null;

    attributes.valueFacets.forEach((filter: IValueFacets) => {
        if (filter.name === 'category') {
            category = Array.isArray(filter.values) ? filter.values : [];
            currentCategoryId = Number(filter.activeValue);
            categoriesLocalizedName = filter.localizedName;
        } else {
            filters.push(filter);

            if (filter.activeValue) {
                activeFilters[filter.name] = Array.isArray(filter.activeValue)
                    ? filter.activeValue : [filter.activeValue];
            }
        }
    });

    attributes.rangeFacets.forEach(range => {
        if (range.activeMin !== range.min || range.activeMax !== range.max) {
            activeRangeFilters[range.name] = {
                min: rangeFilterValueToFront(range.activeMin, rangeMinType),
                max: rangeFilterValueToFront(range.activeMax, rangeMaxType)
            };
        }
    });

    const parseProductItems = attributes.abstractProducts.map(item => ({
        ...item,
        labels: null,
        image: item.images[0].externalUrlSmall,
        prices: parsePrices(item.prices)
    }));

    const result: ICatalogSearchDataParsed = {
        items: parseProductItems,
        filters,
        activeFilters,
        category,
        currentCategoryId,
        currentSort,
        currentItemsPerPage: attributes.pagination.currentItemsPerPage,
        currentPaginationPage,
        rangeFilters: attributes.rangeFacets,
        activeRangeFilters,
        sortParams: attributes.sort.sortParamNames,
        sortParamLocalizedNames: attributes.sort.sortParamLocalizedNames,
        categoriesLocalizedName,
        pagination: {
            numFound: pagination.numFound,
            currentPage: pagination.currentPage,
            maxPage: pagination.maxPage,
            currentItemsPerPage: pagination.currentItemsPerPage,
            validItemsPerPageOptions: pagination.config.validItemsPerPageOptions
        },
        spellingSuggestion: attributes.spellingSuggestion
    };

    if (!included) {
        return result;
    }

    const availableLabels: IProductLabelsCollectionResponse | null = getAvailableLables(included);

    included.forEach((row: ICatalogSearchRowIncludedResponse) => {
        const isProductHasLabels = row.type === 'abstract-products' && row.relationships &&
            row.relationships['product-labels'] && availableLabels;

        if (isProductHasLabels) {
            const labelsIdArr: string[] = row.relationships['product-labels'].data
                .map((item: IProductAvailableLabelResponse) => item.id);
            const appropriateResultItem = result.items.filter(item => item.abstractSku === row.id)[0];

            appropriateResultItem.labels = getProductLabel(labelsIdArr, availableLabels);
        }
    });

    return result;
};

export const parseSuggestionSearchResponse = (response: ISuggestionSearchRawResponse, productsLimit: number) => {
    const products: IProductCardResponse[] = response.data[0].attributes.abstractProducts.slice(0, productsLimit)
        .map((product: IProductCardResponse) => {
            const image = product.images[0].externalUrlSmall;
            delete product.images;

            return {
                ...product,
                image
            };
        });

    response.included && response.included.forEach((row: TProductRowResponseIncluded) => {
        const product: IProductCardResponse = products.find(product => product.abstractSku === row.id);

        if (row.type === 'abstract-product-prices' && product && row.attributes.prices) {
            (product as IProductCard).prices = parsePrices(row.attributes.prices);
        }
    });

    return products as IProductCard[];
};
