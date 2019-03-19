import {
    FilterValue,
    ICatalogSearchDataParsed,
    IProductLabelResponse,
    TLocalizedName,
    ValueFacets,
} from '@interfaces/searchPageData';
import { ICatalogSearchRawResponse, IRowCatalogSearchIncludedResponse } from '@helpers/catalog/types';
import { rangeFilterValueToFront } from '@helpers/common/transform';
import {
    rangeMinType,
    rangeMaxType,
    TActiveFilters,
    TActiveRangeFilters
} from '@application/pages/SearchPage/SearchFilterList/types';

export const parseCatalogSearchResponse = (response: ICatalogSearchRawResponse): ICatalogSearchDataParsed | null => {
    if (!response) {
        return null;
    }

    const {data, included}: ICatalogSearchRawResponse = response;

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
        items: attributes.abstractProducts,
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
            validItemsPerPageOptions: pagination.config.validItemsPerPageOptions,
        },
        spellingSuggestion: attributes.spellingSuggestion,
        productsLabeled: null,
        availableLabels: null,
    };

    if (!included) {
        return result;
    }

    included.forEach((row: IRowCatalogSearchIncludedResponse) => {
        if (row.type === 'abstract-products'
            && row.relationships
            && row.relationships['product-labels']
            && row.relationships['product-labels'].data) {

            if (!result.productsLabeled) {
                result.productsLabeled = {};
            }
            result.productsLabeled[row.id] = row.relationships['product-labels'].data.map((
                item: IProductLabelResponse
            ) => item.id);
        } else {
            if (row.type === 'product-labels') {
                if (!result.productsLabeled) {
                    result.availableLabels = {};
                }

                result.availableLabels[row.id] = {
                    id: row.id,
                    frontEndReference: row.attributes.frontEndReference,
                    isExclusive: row.attributes.isExclusive,
                    name: row.attributes.name,
                    position: row.attributes.position,
                };
            }
        }
    });

    return result;
};