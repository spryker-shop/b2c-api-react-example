import { reduxify } from 'src/shared/lib/redux-helper';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { getSortParamLocalizedNames } from '@stores/reducers/pages/search';
import { setSortAction } from '@stores/actions/pages/search';
import { IActiveSort } from '@interfaces/searchPageData';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchState = state.pageSearch.data;
    const sortParamLocalizedNames = getSortParamLocalizedNames(state, ownProps);

    return ({
        pagination: pageSearchState.pagination,
        currentSort: pageSearchState.currentSort,
        sortParams: pageSearchState.sortParams,
        currentItemsPerPage: pageSearchState.currentItemsPerPage,
        sortParamLocalizedNames
    });
};

const mapDispatchToProps = (dispatch: Function) => ({
    setSortAction: (activeSortOptions: IActiveSort) => dispatch(setSortAction(activeSortOptions))
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
