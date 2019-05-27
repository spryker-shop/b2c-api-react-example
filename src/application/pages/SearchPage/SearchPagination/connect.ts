import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { setPaginationPageAction } from '@stores/actions/pages/search';
import { IPagination } from '@containers/AppPagination/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const pagination: IPagination = state.pageSearch.data.pagination;

    return ({
        pagination
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setPaginationPageAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
