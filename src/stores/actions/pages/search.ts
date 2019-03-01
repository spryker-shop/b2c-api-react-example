import {
    PAGES_SEARCH_REQUEST,
    PAGES_SEARCH_REQUEST_CLEAR,
    PAGES_SEARCH_TERM_CLEAR,
    PAGES_SUGGESTION_REQUEST,
    PAGES_SEARCH_FILTERS_SET,
    PAGES_SEARCH_SORT_SET,
    PAGES_SEARCH_SORT_CLEAR,
    PAGES_SEARCH_FILTERS_CLEAR,
    PAGES_SEARCH_PAGINATION_PAGE_SET,
    PAGES_SEARCH_CURRENT_CATEGORY_SET,
    PAGES_SEARCH_PAGINATION_PAGE_CLEAR
} from '@stores/actionTypes/pages/search';
import { CatalogService } from '@services/Common/Catalog';
import {
    IActiveFilters,
    IActiveSort,
    ICatalogSearchDataParsed,
    ISearchQuery,
    TSearchTerm
} from '@interfaces/searchPageData';

export const suggestPendingState = () => ({
    type: PAGES_SUGGESTION_REQUEST + '_PENDING'
});

export const suggestRejectState = (message: string) => ({
    type: PAGES_SUGGESTION_REQUEST + '_REJECTED',
    payloadRejected: {error: message}
});

export const suggestFullfiledState = (payload: object) => ({
    type: PAGES_SUGGESTION_REQUEST + '_FULFILLED',
    payloadSuggestionFulfilled: payload
});

export const sendSuggestionAction = function (query: string) {
    return (dispatch: Function, getState: Function) => {
        CatalogService.catalogSuggestion(dispatch, query);
    };
};

export const sendSearchPendingState = () => ({
    type: PAGES_SEARCH_REQUEST + '_PENDING'
});

export const sendSearchRejectState = (message: string) => ({
    type: PAGES_SEARCH_REQUEST + '_REJECTED',
    payloadRejected: {error: message}
});

export const sendSearchFulfilledState = (payloadCategory: ICatalogSearchDataParsed, query: string) => ({
    type: PAGES_SEARCH_REQUEST + '_FULFILLED',
    payloadSearchFulfilled: {...payloadCategory, searchTerm: query}
});

export const sendSearchAction = function (payload: ISearchQuery) {
    return (dispatch: Function, getState: Function) => {
        CatalogService.catalogSearch(dispatch, payload);
    };
};

export const setActiveFiltersAction = (activeFilters: IActiveFilters) => ({
    type: PAGES_SEARCH_FILTERS_SET,
    payloadActiveFilters: activeFilters
});

export const setSortAction = (activeSortOptions: IActiveSort) => ({
    type: PAGES_SEARCH_SORT_SET,
    payloadActiveSort: activeSortOptions
});

export const clearSortAction = () => ({
    type: PAGES_SEARCH_SORT_CLEAR
});

export const setPaginationPageAction = (page: string) => ({
    type: PAGES_SEARCH_PAGINATION_PAGE_SET,
    payloadPaginationPage: page
});

export const clearPaginationPageAction = () => ({
    type: PAGES_SEARCH_PAGINATION_PAGE_CLEAR
});

export const clearSuggestions = (searchTerm: TSearchTerm) => ({
    type: PAGES_SEARCH_REQUEST_CLEAR,
    payloadSearchTermFulfilled: {searchTerm}
});

export const setCurrentCategoryAction = (categoryId: number) => ({
    type: PAGES_SEARCH_CURRENT_CATEGORY_SET,
    payloadCurrentCategory: categoryId
});

export const clearSearchTermAction = function () {
    return {
        type: PAGES_SEARCH_TERM_CLEAR,
    };
};

export const clearActiveFiltersAction = () => ({
    type: PAGES_SEARCH_FILTERS_CLEAR
});
