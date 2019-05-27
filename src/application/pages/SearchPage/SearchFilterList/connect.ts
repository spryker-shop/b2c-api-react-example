import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { clearActiveFiltersAction, setActiveFiltersAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { isPageLockedFulfilledState } from '@stores/actions/common/init';
import { IRangeFacets, IValueFacets, TActiveFilters, TActiveRangeFilters } from '@interfaces/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;
    const isLoading: boolean = pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false;
    const isFulfilled: boolean = pageSearchProps && pageSearchProps.fulfilled ? pageSearchProps.fulfilled : false;
    const filters: IValueFacets[] = pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : null;
    const rangeFilters: IRangeFacets[] = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.rangeFilters : null;
    const activeRangeFilters: TActiveRangeFilters = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.activeRangeFilters : {};
    const activeFilters: TActiveFilters = pageSearchProps && pageSearchProps.data
        ? pageSearchProps.data.activeFilters : {};

    return {
        isLoading,
        isFulfilled,
        filters,
        activeFilters,
        rangeFilters,
        activeRangeFilters
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearActiveFiltersAction,
    setActiveFiltersAction,
    isPageLockedFulfilledState
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
