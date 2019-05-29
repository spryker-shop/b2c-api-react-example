import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { cartDeleteItemAction } from '@stores/actions/common/cart';
import { ICartState } from '@stores/reducers/common/cart/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const cartProps: ICartState = state.cart ? state.cart : null;
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCartLoading = isCartStateLoading(state, ownProps);
    const cartItemsQuantity = getTotalItemsQuantity(state, ownProps);

    return ({
        cartId: getCartId(state, ownProps),
        totals: cartProps && cartProps.data ? cartProps.data.totals : null,
        cartItems: cartProps && cartProps.data ? cartProps.data.items : null,
        isUserLoggedIn,
        anonymId,
        isCartLoading,
        cartItemsQuantity
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            cartDeleteItemAction,
            clearCheckoutDataForm
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
