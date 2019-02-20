import { reduxify } from 'src/shared/lib/redux-helper';
import { IActiveFilters } from '@interfaces/searchPageData';
import { clearActiveFiltersAction, setActiveFiltersAction } from '@stores/actions/pages/search';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ISearchState } from '@stores/reducers/pages/search/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchProps: ISearchState = state.pageSearch ? state.pageSearch : null;

    return {
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : false,
        filters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.filters : null,
        activeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeFilters : {},
        rangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.rangeFilters : null,
        activeRangeFilters: pageSearchProps && pageSearchProps.data ? pageSearchProps.data.activeRangeFilters : {},
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    setActiveFilters: (activeFilters: IActiveFilters) => dispatch(setActiveFiltersAction(activeFilters)),
    clearActiveFilters: () => dispatch(clearActiveFiltersAction()),
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
