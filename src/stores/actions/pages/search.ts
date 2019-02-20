import {
    PAGES_SEARCH_REQUEST,
    PAGES_SEARCH_REQUEST_CLEAR,
    PAGES_SEARCH_TERM_CLEAR,
    PAGES_SUGGESTION_REQUEST,
    PAGES_SEARCH_FILTERS_CLEAR
} from '@stores/actionTypes/pages/search';
import { CatalogService } from '@services/common/Catalog';
import { ICatalogSearchDataParsed, ISearchQuery, TSearchTerm } from '@interfaces/searchPageData';

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

export const clearSuggestions = (searchTerm: TSearchTerm) => ({
    type: PAGES_SEARCH_REQUEST_CLEAR,
    payloadSearchTermFulfilled: {searchTerm}
});

export const clearSearchTermAction = function () {
    return {
        type: PAGES_SEARCH_TERM_CLEAR,
    };
};

export const clearActiveFiltersAction = () => ({
    type: PAGES_SEARCH_FILTERS_CLEAR
});
