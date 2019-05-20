import { reduxify } from '@hoc/Reduxify';
import { IActiveFilters } from '@interfaces/searchPageData';
import { clearActiveFiltersAction, setActiveFiltersAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { isPageLockedFulfilledState } from '@stores/actions/common/init';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;

    return {
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
        isFulfilled: pageSearchProps && pageSearchProps.fulfilled ? pageSearchProps.fulfilled : false,
        filters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : null,
        activeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeFilters : {},
        rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : null,
        activeRangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeRangeFilters : {}
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    setActiveFilters: (activeFilters: IActiveFilters) => dispatch(setActiveFiltersAction(activeFilters)),
    clearActiveFilters: () => dispatch(clearActiveFiltersAction()),
    isPageLocked: (payload: boolean) => dispatch(isPageLockedFulfilledState(payload))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
