import * as actionTypes from '@stores/actionTypes/pages/search';
import { FlyoutSearchService } from '@services/common/FlyoutSearch';
import { SearchService } from '@services/pages/Search';
import { IActiveFilters, IActiveSort, ICatalogSearchDataParsed, ISearchQuery } from '@interfaces/search';

export const suggestPendingState = () => ({
    type: actionTypes.PAGES_SUGGESTION_REQUEST + '_PENDING'
});

export const suggestRejectState = (message: string) => ({
    type: actionTypes.PAGES_SUGGESTION_REQUEST + '_REJECTED',
    payloadRejected: {error: message}
});

export const suggestFullfiledState = (payload: object) => ({
    type: actionTypes.PAGES_SUGGESTION_REQUEST + '_FULFILLED',
    payloadSuggestionFulfilled: payload
});

export const sendSuggestionAction = function (query: string) {
    return (dispatch: Function, getState: Function) => {
        FlyoutSearchService.searchSuggestion(dispatch, query);
    };
};

export const sendSearchPendingState = () => ({
    type: actionTypes.PAGES_SEARCH_REQUEST + '_PENDING'
});

export const sendSearchRejectState = (message: string) => ({
    type: actionTypes.PAGES_SEARCH_REQUEST + '_REJECTED',
    payloadRejected: {error: message}
});

export const sendSearchFulfilledState = (payloadCategory: ICatalogSearchDataParsed, query: string) => ({
    type: actionTypes.PAGES_SEARCH_REQUEST + '_FULFILLED',
    payloadSearchFulfilled: {...payloadCategory, searchTerm: query}
});

export const sendSearchAction = function (payload: ISearchQuery) {
    return (dispatch: Function, getState: Function) => {
        SearchService.catalogSearch(dispatch, payload);
    };
};

export const setActiveFiltersAction = (activeFilters: IActiveFilters) => ({
    type: actionTypes.PAGES_SEARCH_FILTERS_SET,
    payloadActiveFilters: activeFilters
});

export const setSortAction = (activeSortOptions: IActiveSort) => ({
    type: actionTypes.PAGES_SEARCH_SORT_SET,
    payloadActiveSort: activeSortOptions
});

export const clearSortAction = () => ({
    type: actionTypes.PAGES_SEARCH_SORT_CLEAR
});

export const setPaginationPageAction = (page: string) => ({
    type: actionTypes.PAGES_SEARCH_PAGINATION_PAGE_SET,
    payloadPaginationPage: page
});

export const clearPaginationPageAction = () => ({
    type: actionTypes.PAGES_SEARCH_PAGINATION_PAGE_CLEAR
});

export const clearSuggestions = (searchTerm: string) => ({
    type: actionTypes.PAGES_SEARCH_REQUEST_CLEAR,
    payloadSearchTermFulfilled: {searchTerm}
});

export const setCurrentCategoryAction = (categoryId: number) => ({
    type: actionTypes.PAGES_SEARCH_CURRENT_CATEGORY_SET,
    payloadCurrentCategory: categoryId
});

export const clearSearchTermAction = function () {
    return {
        type: actionTypes.PAGES_SEARCH_TERM_CLEAR,
    };
};

export const clearActiveFiltersAction = () => ({
    type: actionTypes.PAGES_SEARCH_FILTERS_CLEAR
});
