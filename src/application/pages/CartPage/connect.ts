import { reduxify } from '@application/hoc/Reduxify';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { getCartTotals, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);
    const { totalQty }: { items: ICartItem[], totalQty: number } = getProductsFromCart(state, ownProps);

    return ({
        isCartEmpty: state.cart.data.isCartEmpty,
        totalQty,
        totals
    });
};

export const connect = reduxify(mapStateToProps);
