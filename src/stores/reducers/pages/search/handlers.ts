import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { initialState } from '@stores/reducers/pages/search';
import { IActiveFilters, IActiveSort, ICatalogSearchDataParsed, IFlyoutSearch } from '@interfaces/search';

export const handleFulfilled = (state: ISearchState, payload: ICatalogSearchDataParsed): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        ...payload,
        isFiltersUpdated: false,
        isCategoryAsFilter: false
    },
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: ISearchState, payload: IApiErrorResponse): ISearchState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        activeFilters: {}
    },
    ...getReducerPartPending()
});

export const handleSuggestionPending = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        flyoutSearch: {
            ...state.data.flyoutSearch,
            pending: true,
            fulfilled: false
        }
    }
});

export const handleSuggestionFulfilled = (state: ISearchState, payload: IFlyoutSearch): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        flyoutSearch: {
            ...payload,
            pending: false,
            fulfilled: true
        }
    }
});

export const handleSuggestionRejected = (state: ISearchState, payload: IApiErrorResponse): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        flyoutSearch: {
            ...state.data.flyoutSearch,
            pending: false,
            fulfilled: false
        }
    },
    error: payload.error
});

export const handleSuggestionClear = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        searchTerm: initialState.data.searchTerm,
        spellingSuggestion: initialState.data.spellingSuggestion,
        flyoutSearch: initialState.data.flyoutSearch
    }
});

export const handleSearchTermClear = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        searchTerm: initialState.data.searchTerm
    }
});

export const handleSearchFiltersSet = (state: ISearchState, payload: IActiveFilters): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        ...payload,
        currentPaginationPage: initialState.data.currentPaginationPage,
        isFiltersUpdated: true
    }
});

export const handleSearchFiltersClear = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        activeFilters: initialState.data.activeFilters,
        activeRangeFilters: initialState.data.activeRangeFilters,
        currentPaginationPage: initialState.data.currentPaginationPage,
        isFiltersUpdated: true
    }
});

export const handleSearchSortSet = (state: ISearchState, payload: IActiveSort): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        currentSort: payload.sort,
        currentItemsPerPage: payload.itemsPerPage,
        currentPaginationPage: initialState.data.currentPaginationPage,
        isFiltersUpdated: true
    }
});

export const handleSearchSortClear = (state: ISearchState): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        currentSort: initialState.data.currentSort,
        currentItemsPerPage: initialState.data.currentItemsPerPage
    }
});

export const handleSearchPaginationPageSet = (state: ISearchState, payload: number): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        currentPaginationPage: payload,
        isFiltersUpdated: true
    }
});

export const handleSearchCurrentCategorySet = (state: ISearchState, payload: number): ISearchState => ({
    ...state,
    data: {
        ...state.data,
        currentCategoryId: payload,
        isFiltersUpdated: true,
        isCategoryAsFilter: true,
        currentPaginationPage: initialState.data.currentPaginationPage
    }
});
