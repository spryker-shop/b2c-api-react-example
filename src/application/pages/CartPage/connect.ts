import { reduxify } from '@application/hoc/Reduxify';

import { ICartItem, TCartId } from '@interfaces/cart';

import { isUserAuthenticated } from '@stores/reducers/pages/login';
import { getProductsFromCart, getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const isUserLoggedIn: boolean = isUserAuthenticated(state, ownProps);
    const { totalQty }: { items: ICartItem[], totalQty: number } = getProductsFromCart(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);

    return (
        {
            isCartEmpty: state.cart.data.isCartEmpty,
            isUserLoggedIn,
            totalQty,
            cartId
        }
    );
};

export const connect = reduxify(mapStateToProps);
