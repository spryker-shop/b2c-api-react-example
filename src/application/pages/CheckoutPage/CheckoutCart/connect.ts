import { reduxify } from '@hoc/Reduxify';
import { getCartTotals, getProductsFromCart, getTotalItemsQuantity } from '@stores/reducers/common/cart/selectors';
import { getAppLocale } from '@stores/reducers/common/init/selectors';
import { ICartItem } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ITotals } from '@interfaces/common';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ITotals = getCartTotals(state, ownProps);
    const { items: products }: { items: ICartItem[] } = getProductsFromCart(state, ownProps);
    const locale: string = getAppLocale(state, ownProps);
    const cartItemsQuantity: number = getTotalItemsQuantity(state, ownProps);
    const shipmentMethodPrice: number = state.pageCheckout.shipmentMethodPrice;

    return {
        products,
        totals,
        locale,
        cartItemsQuantity,
        shipmentMethodPrice
    };
};

export const connect = reduxify(mapStateToProps);
