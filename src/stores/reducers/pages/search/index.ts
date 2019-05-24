import produce from 'immer';
import {
    PAGES_SEARCH_REQUEST,
    PAGES_SEARCH_REQUEST_CLEAR,
    PAGES_SEARCH_TERM_CLEAR,
    PAGES_SEARCH_FILTERS_SET,
    PAGES_SEARCH_FILTERS_CLEAR,
    PAGES_SEARCH_SORT_SET,
    PAGES_SEARCH_SORT_CLEAR,
    PAGES_SUGGESTION_REQUEST,
    PAGES_SEARCH_PAGINATION_PAGE_SET,
    PAGES_SEARCH_CURRENT_CATEGORY_SET
} from '@stores/actionTypes/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IPageSearchAction, ISearchState } from '@stores/reducers/pages/search/types';
import { defaultItemsPerPage } from '@constants/search';
import { IIndexSignature } from '@interfaces/common';

export const initialState: ISearchState = {
    data: {
        flyoutSearch: {
            suggestions: [],
            categories: [],
            completion: [],
            pending: false,
            fulfilled: false
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
        isFiltersUpdated: false,
        isCategoryAsFilter: false,
        currentSort: '',
        currentItemsPerPage: 12,
        currentPaginationPage: 1,
        currentCategoryId: null,
        pagination: {
            numFound: 0,
            currentPage: 0,
            maxPage: 0,
            currentItemsPerPage: defaultItemsPerPage,
            validItemsPerPageOptions: [defaultItemsPerPage],
        },
        category: [],
        spellingSuggestion: null
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
                draft.data.flyoutSearch.fulfilled = false;
                break;
            case `${PAGES_SUGGESTION_REQUEST}_FULFILLED`:
                draft.data.flyoutSearch.suggestions = action.payloadSuggestionFulfilled.suggestions;
                draft.data.flyoutSearch.categories = action.payloadSuggestionFulfilled.categories;
                draft.data.flyoutSearch.completion = action.payloadSuggestionFulfilled.completion;
                draft.data.flyoutSearch.pending = false;
                draft.data.flyoutSearch.fulfilled = true;
                break;
            case `${PAGES_SEARCH_REQUEST}_REJECTED`:
                draft.error = action.payloadRejected.error || action.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                break;
            case `${PAGES_SUGGESTION_REQUEST}_REJECTED`:
                draft.data.flyoutSearch.pending = false;
                draft.data.flyoutSearch.fulfilled = false;
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
                draft.data.currentItemsPerPage = action.payloadSearchFulfilled.currentItemsPerPage;
                draft.data.pagination = action.payloadSearchFulfilled.pagination;
                draft.data.currentPaginationPage = action.payloadSearchFulfilled.currentPaginationPage;
                draft.data.currentCategoryId = action.payloadSearchFulfilled.currentCategoryId;
                draft.data.spellingSuggestion = action.payloadSearchFulfilled.spellingSuggestion || null;
                draft.data.searchTerm = action.payloadSearchFulfilled.searchTerm;
                draft.data.isFiltersUpdated = false;
                draft.data.isCategoryAsFilter = false;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case PAGES_SEARCH_REQUEST_CLEAR:
                draft.data.searchTerm = '';
                draft.data.flyoutSearch.suggestions = [];
                draft.data.flyoutSearch.categories = [];
                draft.data.flyoutSearch.completion = [];
                draft.data.flyoutSearch.fulfilled = false;
                draft.data.spellingSuggestion = null;
                break;
            case PAGES_SEARCH_TERM_CLEAR:
                draft.data.searchTerm = '';
                break;
            case PAGES_SEARCH_FILTERS_SET:
                draft.data.activeFilters = action.payloadActiveFilters.activeFilters;
                draft.data.activeRangeFilters = action.payloadActiveFilters.activeRangeFilters;
                draft.data.currentPaginationPage = 1;
                draft.data.isFiltersUpdated = true;
                break;
            case PAGES_SEARCH_SORT_SET:
                draft.data.currentSort = action.payloadActiveSort.sort;
                draft.data.currentItemsPerPage = action.payloadActiveSort.itemsPerPage;
                draft.data.currentPaginationPage = 1;
                draft.data.isFiltersUpdated = true;
                break;
            case PAGES_SEARCH_SORT_CLEAR:
                draft.data.currentSort = ' ';
                draft.data.currentItemsPerPage = draft.data.pagination.validItemsPerPageOptions[0];
                break;
            case PAGES_SEARCH_PAGINATION_PAGE_SET:
                draft.data.currentPaginationPage = action.payloadPaginationPage;
                draft.data.isFiltersUpdated = true;
                break;
            case PAGES_SEARCH_CURRENT_CATEGORY_SET:
                draft.data.currentCategoryId = action.payloadCurrentCategory;
                draft.data.currentPaginationPage = 1;
                draft.data.isCategoryAsFilter = true;
                draft.data.isFiltersUpdated = true;
                break;
            case PAGES_SEARCH_FILTERS_CLEAR:
                draft.data.activeFilters = {};
                draft.data.activeRangeFilters = {};
                draft.data.pagination.currentItemsPerPage = draft.data.pagination.validItemsPerPageOptions[0];
                draft.data.isFiltersUpdated = true;
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

export function getSpellingSuggestion(state: IReduxStore, props: IReduxOwnProps): string | null {
    return (
        state.pageSearch.data && state.pageSearch.data.spellingSuggestion
            ? state.pageSearch.data.spellingSuggestion
            : null
    );
}

export function getSortParamLocalizedNames(state: IReduxStore, props: IReduxOwnProps): IIndexSignature | null {
    return (
        state.pageSearch.data && state.pageSearch.data.sortParamLocalizedNames
            ? state.pageSearch.data.sortParamLocalizedNames
            : null
    );
}

export function getCategoriesLocalizedName(state: IReduxStore, props: IReduxOwnProps): string | null {
    return (
        state.pageSearch.data && state.pageSearch.data.categoriesLocalizedName
            ? state.pageSearch.data.categoriesLocalizedName
            : null
    );
}
