import produce from 'immer';
import {
    PAGES_SEARCH_REQUEST,
    PAGES_SEARCH_REQUEST_CLEAR,
    PAGES_SEARCH_TERM_CLEAR,
    PAGES_SEARCH_FILTERS_CLEAR,
    PAGES_SUGGESTION_REQUEST,
} from '@stores/actionTypes/pages/search';
import {
    IAvailableLabelsCollection,
    ILocalizedNamesMap,
    IProductsLabeledCollection,
    TLocalizedName,
    TSpellingSuggestion,
} from '@interfaces/searchPageData';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IPageSearchAction, ISearchState } from '@stores/reducers/pages/search/types';
import { DefaultItemsPerPage } from '@constants/search';

export const initialState: ISearchState = {
    data: {
        flyoutSearch: {
            suggestions: [],
            categories: [],
            completion: [],
            pending: false,
        },
        searchTerm: '',
        items: [],
        filters: [],
        activeFilters: {},
        rangeFilters: [],
        activeRangeFilters: {},
        sortParams: [],
        sortParamLocalizedNames: null,
        categoriesLocalizedName: null,
        currentSort: '',
        currentCategory: '',
        pagination: {
            numFound: 0,
            currentPage: 0,
            maxPage: 0,
            currentItemsPerPage: DefaultItemsPerPage,
            validItemsPerPageOptions: [DefaultItemsPerPage],
        },
        category: [],
        spellingSuggestion: null,
        productsLabeled: null,
        availableLabels: null,
    },
};

export const pageSearch = produce<ISearchState>(
    (draft: ISearchState, action: IPageSearchAction) => {
        switch (action.type) {
            case `${PAGES_SEARCH_REQUEST}_PENDING`:
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = true;
                draft.data.activeFilters = {};
                break;
            case `${PAGES_SUGGESTION_REQUEST}_PENDING`:
                draft.data.flyoutSearch.pending = true;
                break;
            case `${PAGES_SUGGESTION_REQUEST}_FULFILLED`:
                draft.data.flyoutSearch.suggestions = action.payloadSuggestionFulfilled.suggestions;
                draft.data.flyoutSearch.categories = action.payloadSuggestionFulfilled.categories;
                draft.data.flyoutSearch.completion = action.payloadSuggestionFulfilled.completion;
                draft.data.flyoutSearch.pending = false;
                break;
            case `${PAGES_SEARCH_REQUEST}_REJECTED`:
                draft.error = action.payloadRejected.error || action.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                break;
            case `${PAGES_SUGGESTION_REQUEST}_REJECTED`:
                draft.data.flyoutSearch.pending = false;
                draft.error = action.payloadRejected.error || action.error;
                break;
            case `${PAGES_SEARCH_REQUEST}_FULFILLED`:
                draft.data.items = action.payloadSearchFulfilled.items;
                draft.data.filters = action.payloadSearchFulfilled.filters;
                draft.data.activeFilters = action.payloadSearchFulfilled.activeFilters;
                draft.data.category = action.payloadSearchFulfilled.category;
                draft.data.rangeFilters = action.payloadSearchFulfilled.rangeFilters;
                draft.data.activeRangeFilters = action.payloadSearchFulfilled.activeRangeFilters;
                draft.data.sortParams = action.payloadSearchFulfilled.sortParams;
                draft.data.sortParamLocalizedNames = action.payloadSearchFulfilled.sortParamLocalizedNames;
                draft.data.categoriesLocalizedName = action.payloadSearchFulfilled.categoriesLocalizedName;
                draft.data.currentSort = action.payloadSearchFulfilled.currentSort;
                draft.data.pagination = action.payloadSearchFulfilled.pagination;
                draft.data.currentCategory = action.payloadSearchFulfilled.currentCategory;
                draft.data.spellingSuggestion = action.payloadSearchFulfilled.spellingSuggestion || null;
                draft.data.productsLabeled = action.payloadSearchFulfilled.productsLabeled || null;
                draft.data.availableLabels = action.payloadSearchFulfilled.availableLabels || null;
                draft.data.searchTerm = action.payloadSearchFulfilled.searchTerm;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case PAGES_SEARCH_REQUEST_CLEAR:
                // draft.data.searchTerm = action.searchTerm;
                draft.data.flyoutSearch.suggestions = [];
                draft.data.flyoutSearch.categories = [];
                draft.data.flyoutSearch.completion = [];
                draft.data.spellingSuggestion = null;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case PAGES_SEARCH_TERM_CLEAR:
                draft.data.searchTerm = '';
                break;
            case PAGES_SEARCH_FILTERS_CLEAR:
                draft.data.activeFilters = {};
                draft.data.activeRangeFilters = {};
                draft.data.currentSort = null;
                draft.data.pagination.currentItemsPerPage = draft.data.pagination.validItemsPerPageOptions[0];
                break;
            default:
                break;
        }
    },
    initialState,
);

// selectors
export function isPageSearchStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.pageSearch && state.pageSearch.pending && state.pageSearch.pending === true);
}

export function getSpellingSuggestion(state: IReduxStore, props: IReduxOwnProps): TSpellingSuggestion | null {
    return (
        state.pageSearch.data && state.pageSearch.data.spellingSuggestion
            ? state.pageSearch.data.spellingSuggestion
            : null
    );
}

export function getProductsLabeled(state: IReduxStore, props: IReduxOwnProps): IProductsLabeledCollection | null {
    return (
        state.pageSearch.data && state.pageSearch.data.productsLabeled
            ? state.pageSearch.data.productsLabeled
            : null
    );
}

export function getAvailableLabels(state: IReduxStore, props: IReduxOwnProps): IAvailableLabelsCollection | null {
    return (
        state.pageSearch.data && state.pageSearch.data.availableLabels
            ? state.pageSearch.data.availableLabels
            : null
    );
}

export function getSortParamLocalizedNames(state: IReduxStore, props: IReduxOwnProps): ILocalizedNamesMap | null {
    return (
        state.pageSearch.data && state.pageSearch.data.sortParamLocalizedNames
            ? state.pageSearch.data.sortParamLocalizedNames
            : null
    );
}

export function getCategoriesLocalizedName(state: IReduxStore, props: IReduxOwnProps): TLocalizedName | null {
    return (
        state.pageSearch.data && state.pageSearch.data.categoriesLocalizedName
            ? state.pageSearch.data.categoriesLocalizedName
            : null
    );
}
