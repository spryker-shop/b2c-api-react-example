import * as actionTypes from '@stores/actionTypes/pages/search';
import * as searchHandlers  from '@stores/reducers/pages/search/handlers';
import { IPageSearchAction, ISearchState } from '@stores/reducers/pages/search/types';
import { defaultItemsPerPage } from '@constants/search';

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
        currentItemsPerPage: defaultItemsPerPage,
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
    }
};

export const pageSearch = (state: ISearchState = initialState, action: IPageSearchAction): ISearchState => {
    switch (action.type) {
        case `${ actionTypes.PAGES_SEARCH_REQUEST }_PENDING`:
            return searchHandlers.handlePending(state);
        case `${ actionTypes.PAGES_SUGGESTION_REQUEST }_PENDING`:
            return searchHandlers.handleSuggestionPending(state);
        case `${ actionTypes.PAGES_SUGGESTION_REQUEST }_FULFILLED`:
            return searchHandlers.handleSuggestionFulfilled(state, action.payloadSuggestionFulfilled);
        case `${ actionTypes.PAGES_SEARCH_REQUEST }_REJECTED`:
            return searchHandlers.handleRejected(state, action.payloadRejected);
        case `${ actionTypes.PAGES_SUGGESTION_REQUEST }_REJECTED`:
            return searchHandlers.handleSuggestionRejected(state, action.payloadRejected);
        case `${ actionTypes.PAGES_SEARCH_REQUEST }_FULFILLED`:
            return searchHandlers.handleFulfilled(state, action.payloadSearchFulfilled);
        case actionTypes.PAGES_SEARCH_REQUEST_CLEAR:
            return searchHandlers.handleSuggestionClear(state);
        case actionTypes.PAGES_SEARCH_TERM_CLEAR:
            return searchHandlers.handleSearchTermClear(state);
        case actionTypes.PAGES_SEARCH_FILTERS_SET:
            return searchHandlers.handleSearchFiltersSet(state, action.payloadActiveFilters);
        case actionTypes.PAGES_SEARCH_SORT_SET:
            return searchHandlers.handleSearchSortSet(state, action.payloadActiveSort);
        case actionTypes.PAGES_SEARCH_SORT_CLEAR:
            return searchHandlers.handleSearchSortClear(state);
        case actionTypes.PAGES_SEARCH_PAGINATION_PAGE_SET:
            return searchHandlers.handleSearchPaginationPageSet(state, action.payloadPaginationPage);
        case actionTypes.PAGES_SEARCH_CURRENT_CATEGORY_SET:
            return searchHandlers.handleSearchCurrentCategorySet(state, action.payloadCurrentCategory);
        case actionTypes.PAGES_SEARCH_FILTERS_CLEAR:
            return searchHandlers.handleSearchFiltersClear(state);
        default:
            return state;
    }
};
