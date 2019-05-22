import * as React from 'react';
import { push } from 'connected-react-router';
import { reduxify } from '@hoc/Reduxify';
import { getSpellingSuggestion } from '@stores/reducers/pages/search';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init/selectors';
import { ISearchQuery } from '@interfaces/search';
import { getRouterMatchParam } from '@helpers/router';
import {
    sendSearchAction,
    clearActiveFiltersAction,
    clearSearchTermAction,
    clearSortAction,
    clearPaginationPageAction
} from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/common';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const currency: string | null = getAppCurrency(state, ownProps);
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const spellingSuggestion: string = getSpellingSuggestion(state, ownProps);
    const locationCategoryId = getRouterMatchParam(state, ownProps, 'categoryId');

    return ({
        isFiltersUpdated: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.isFiltersUpdated : false,
        isCategoryAsFilter: pageSearchProps.data.isCategoryAsFilter,
        category: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.category : null,
        categoriesTree,
        spellingSuggestion,
        currentSort: pageSearchProps.data.currentSort,
        currentItemsPerPage: pageSearchProps.data.currentItemsPerPage,
        currentCategoryId: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currentCategoryId : null,
        currentPaginationPage: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.currentPaginationPage : 1,
        searchTerm: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.searchTerm : '',
        activeRangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeRangeFilters : {},
        activeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeFilters : {},
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
        currency,
        locationCategoryId,
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    changeLocation: (location: string) => dispatch(push(location)),
    sendSearch: (params: ISearchQuery) => dispatch(sendSearchAction(params)),
    clearActiveFilters: () => dispatch(clearActiveFiltersAction()),
    clearSearchTerm: () => dispatch(clearSearchTermAction()),
    clearSort: () => dispatch(clearSortAction()),
    clearPaginationPage: () => dispatch(clearPaginationPageAction())
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
