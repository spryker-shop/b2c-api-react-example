import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { reduxify } from '@hoc/Reduxify';
import { sendSearchAction } from '@stores/actions/pages/search';
import { getAppCurrency } from '@stores/reducers/common/init/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IFlyoutSearch } from '@interfaces/search';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: IFlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: string | null = getAppCurrency(state, ownProps);
    const completion: string[] | null = searchProps ? searchProps.completion : null;
    const isLoading: boolean = searchProps ? searchProps.pending : null;

    return {
        completion,
        isLoading,
        currency
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    sendSearchAction,
    push
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
