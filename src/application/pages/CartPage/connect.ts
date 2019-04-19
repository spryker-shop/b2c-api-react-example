import { reduxify } from '@hoc/Reduxify';
import { ICartItem, ICartTotals, TCartId } from '@interfaces/cart';
import { getCartTotals, getProductsFromCart, getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';

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

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    clearCheckoutDataForm: (): void => dispatch(clearCheckoutDataForm())
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
