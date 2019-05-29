import { bindActionCreators, Dispatch } from 'redux';
import { reduxify } from '@hoc/Reduxify';
import { getCartTotals, getProductsFromCart, getCartId } from '@stores/reducers/common/cart/selectors';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { clearCheckoutDataForm } from '@stores/actions/pages/checkout';
import { ITotals } from '@interfaces/common';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ITotals = getCartTotals(state, ownProps);
    const { totalQty }: { totalQty: number } = getProductsFromCart(state, ownProps);
    const cartId: string = getCartId(state, ownProps);
    const isCartEmpty: boolean = state.cart.data.isCartEmpty;

    return {
        isCartEmpty,
        totalQty,
        totals,
        cartId
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearCheckoutDataForm
}, dispatch);

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
