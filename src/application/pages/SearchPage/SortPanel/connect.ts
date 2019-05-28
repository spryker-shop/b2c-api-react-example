import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getSortParamLocalizedNames } from '@stores/reducers/pages/search/selectors';
import { setSortAction } from '@stores/actions/pages/search';
import { IIndexSignature } from '@interfaces/common';
import { IPagination } from '@containers/Pagination/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pageSearchState = state.pageSearch.data;
    const sortParamLocalizedNames: IIndexSignature | null = getSortParamLocalizedNames(state, ownProps);
    const pagination: IPagination = pageSearchState.pagination;
    const currentSort: string = pageSearchState.currentSort;
    const sortParams: string[] = pageSearchState.sortParams;
    const currentItemsPerPage: number = pageSearchState.currentItemsPerPage;

    return {
        pagination,
        currentSort,
        sortParams,
        currentItemsPerPage,
        sortParamLocalizedNames
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setSortAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
