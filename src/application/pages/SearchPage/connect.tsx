import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { reduxify } from '@hoc/Reduxify';
import { getSpellingSuggestion } from '@stores/reducers/pages/search/selectors';
import { getAppCurrency, getCategoriesTree } from '@stores/reducers/common/init/selectors';
import { TActiveFilters, TActiveRangeFilters, IFilterValue } from '@interfaces/search';
import { getRouterMatchParam } from '@helpers/common';
import {
    sendSearchAction,
    clearSearchTermAction,
    clearSortAction,
    clearPaginationPageAction,
    clearActiveFiltersAction
} from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/common';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const currency: string | null = getAppCurrency(state, ownProps);
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const spellingSuggestion: string = getSpellingSuggestion(state, ownProps);
    const locationCategoryId: string = getRouterMatchParam(state, ownProps, 'categoryId');
    const isLoading: boolean = pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false;
    const isCategoryAsFilter: boolean = pageSearchProps.data.isCategoryAsFilter;
    const currentSort: string = pageSearchProps.data.currentSort;
    const currentItemsPerPage: number = pageSearchProps.data.currentItemsPerPage;
    const searchTerm: string = pageSearchProps && pageSearchProps.data ? pageSearchProps.data.searchTerm : '';
    const activeFilters: TActiveFilters = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.activeFilters : {};
    const activeRangeFilters: TActiveRangeFilters = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.activeRangeFilters : {};
    const currentPaginationPage: number = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.currentPaginationPage : 1;
    const currentCategoryId: number = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.currentCategoryId : null;
    const isFiltersUpdated: boolean = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.isFiltersUpdated : false;
    const category: IFilterValue[] = pageSearchProps && pageSearchProps.data ? pageSearchProps.data.category : null;

    return {
        isFiltersUpdated,
        isCategoryAsFilter,
        category,
        categoriesTree,
        spellingSuggestion,
        currentSort,
        currentItemsPerPage,
        currentCategoryId,
        currentPaginationPage,
        searchTerm,
        activeRangeFilters,
        activeFilters,
        isLoading,
        currency,
        locationCategoryId,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    push,
    clearActiveFiltersAction,
    sendSearchAction,
    clearSearchTermAction,
    clearSortAction,
    clearPaginationPageAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
