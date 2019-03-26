import { reduxify } from '@application/hoc/Reduxify';
import { ICartItem, ICartTotals, TCartId } from '@interfaces/cart';
import { getCartTotals, getProductsFromCart, getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);
    const { totalQty }: { items: ICartItem[], totalQty: number } = getProductsFromCart(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);

    return ({
        isCartEmpty: state.cart.data.isCartEmpty,
        totalQty,
        totals,
        cartId
    });
};

export const connect = reduxify(mapStateToProps);
