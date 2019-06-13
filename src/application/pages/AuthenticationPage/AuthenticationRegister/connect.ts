import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { isPageLoginStateLoading, isUserAuthenticated } from '@stores/reducers/pages/login/selectors';
import { customerRegisterAction } from '@stores/actions/pages/login';
import { getCustomerCartsAction } from '@stores/actions/common/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const isLoading: boolean = isPageLoginStateLoading(state, ownProps)
        ? isPageLoginStateLoading(state, ownProps) : false;
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartId: string = getCartId(state, ownProps);

    return {
        isUserLoggedIn,
        isLoading,
        isCartLoading,
        cartId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    customerRegisterAction,
    getCustomerCartsAction
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
