import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isUserAuthenticated, isPageLoginStateLoading } from '@stores/reducers/pages/login';
import { loginCustomerAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isAuth = isUserAuthenticated(state, ownProps);
    const isLoading = isPageLoginStateLoading(state, ownProps) ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading = isCartStateLoading(state, ownProps);

    return ({
        isAuth,
        isLoading,
        isCartLoading
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    loginCustomerAction,
    getCustomerCartsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
