import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { cartDeleteItemAction } from '@stores/actions/common/cart';
import { ICartState } from '@stores/reducers/common/cart/types';
import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getAnonymId } from '@stores/reducers/common/init/selectors';
import { getCartId, getTotalItemsQuantity, isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';
import { ITotals } from '@interfaces/common';
import { ICartItem } from '@interfaces/cart';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const cartProps: ICartState = state.cart ? state.cart : null;
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const anonymId: string = getAnonymId(state, ownProps);
    const isCartLoading: boolean = isCartStateLoading(state, ownProps);
    const cartItemsQuantity: number = getTotalItemsQuantity(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const totals: ITotals | null = cartProps && cartProps.data ? cartProps.data.totals : null;
    const cartItems: ICartItem[] | null = cartProps && cartProps.data ? cartProps.data.items : null;

    return {
        cartId,
        totals,
        cartItems,
        isUserLoggedIn,
        anonymId,
        isCartLoading,
        cartItemsQuantity
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    cartDeleteItemAction,
    clearCheckoutDataForm
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
