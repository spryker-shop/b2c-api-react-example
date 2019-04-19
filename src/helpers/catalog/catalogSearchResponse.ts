import {
    FilterValue,
    ICatalogSearchDataParsed,
    IProductLabelResponse,
    TLocalizedName,
    ValueFacets,
    IAvailableLabelsCollection,
    TLabelId
} from '@interfaces/searchPageData';
import { ICatalogSearchRawResponse, IRowCatalogSearchIncludedResponse } from '@helpers/catalog/types';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import {
    rangeMinType,
    rangeMaxType,
    TActiveFilters,
    TActiveRangeFilters
} from '@pages/SearchPage/SearchFilterList/types';
import { getProductLabel } from '@helpers/product/label';

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
    const filters: ValueFacets[] = [];
    const activeFilters: TActiveFilters = {};
    const activeRangeFilters: TActiveRangeFilters = {};
    const currentSort: string = attributes.sort.currentSortParam || ' ';
    const currentPaginationPage: number = pagination.currentPage;
    let category: FilterValue[] = [];
    let currentCategoryId: number = null;
    let categoriesLocalizedName: TLocalizedName | null = null;

    attributes.valueFacets.forEach((filter: ValueFacets) => {
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

    const result: ICatalogSearchDataParsed = {
        items: attributes.abstractProducts.map(item => ({...item, labels: null})),
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
        spellingSuggestion: attributes.spellingSuggestion,
        productLabels: null
    };

    if (!included) {
        return result;
    }

    const availableLabels: IAvailableLabelsCollection | null = getAvailableLables(included);

    included.forEach((row: IRowCatalogSearchIncludedResponse) => {
        const isProductHasLabels = row.type === 'abstract-products' && row.relationships &&
            row.relationships['product-labels'] && availableLabels;

        if (isProductHasLabels) {
            const labelsIdArr: TLabelId[] = row.relationships['product-labels'].data.map(item => item.id);
            const appropriateResultItem = result.items.filter(item => item.abstractSku === row.id)[0];

            appropriateResultItem.labels = getProductLabel(labelsIdArr, availableLabels);
        }
    });

    return result;
};

const getAvailableLables = (included: IRowCatalogSearchIncludedResponse[]): IAvailableLabelsCollection | null => {
    const availableLabels: IAvailableLabelsCollection | null = {};
    const productLabelsType = 'product-labels';

    const includedLabels: IRowCatalogSearchIncludedResponse[] = included.filter(item => (
        item.type === productLabelsType
    ));

    includedLabels.forEach((label: IRowCatalogSearchIncludedResponse) => {
        availableLabels[label.id] = {
            id: label.id,
            frontEndReference: label.attributes.frontEndReference,
            isExclusive: label.attributes.isExclusive,
            name: label.attributes.name,
            position: label.attributes.position
        };
    });

    return availableLabels;
};
