import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'react-router-redux';
import { reduxify } from '@application/hoc/Reduxify';
import { sendSearchAction } from '@stores/actions/pages/search';
import { getAppCurrency } from '@stores/reducers/common/init';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { FlyoutSearch } from '@interfaces/searchPageData';
import { TAppCurrency } from '@interfaces/currency';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const searchProps: FlyoutSearch = state.pageSearch && state.pageSearch.data
        ? state.pageSearch.data.flyoutSearch
        : null;
    const currency: TAppCurrency = getAppCurrency(state, ownProps);

    return (
        {
            completion: searchProps ? searchProps.completion : null,
            isLoading: searchProps ? searchProps.pending : null,
            currency,
        }
    );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            sendSearchAction,
            push
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
