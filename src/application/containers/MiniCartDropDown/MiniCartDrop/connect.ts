import { bindActionCreators, Dispatch } from 'redux';

import { reduxify } from '@application/hoc/Reduxify';
import { cartDeleteItemAction, removeItemGuestCartAction } from '@stores/actions/common/cart';
import { ICartState } from '@stores/reducers/common/cart/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init';
import { getCartId, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const cartProps: ICartState = state.cart ? state.cart : null;
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const anonymId = getAnonymId(state, ownProps);
    const isCartLoading = isCartStateLoading(state, ownProps);

    return ({
        cartId: getCartId(state, ownProps),
        totals: cartProps && cartProps.data ? cartProps.data.totals : null,
        cartItems: cartProps && cartProps.data ? cartProps.data.items : null,
        isUserLoggedIn,
        anonymId,
        isCartLoading,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            cartDeleteItemAction,
            removeItemGuestCartAction,
        },
        dispatch,
    );

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
