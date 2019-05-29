import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getSortParamLocalizedNames } from '@stores/reducers/pages/search';
import { setSortAction } from '@stores/actions/pages/search';
import { IActiveSort } from '@interfaces/search';

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
