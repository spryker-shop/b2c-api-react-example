import { reduxify } from '@hoc/Reduxify';
import { getCartTotals, getProductsFromCart, getTotalItemsQuantity } from '@stores/reducers/common/cart/selectors';
import { getAppLocale } from '@stores/reducers/common/init/selectors';
import { ICartItem } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ITotals } from '@interfaces/common';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ITotals = getCartTotals(state, ownProps);
    const {items: products}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);
    const locale = getAppLocale(state, ownProps);
    const cartItemsQuantity = getTotalItemsQuantity(state, ownProps);

    return {
        products,
        totals,
        locale,
        cartItemsQuantity
    };
};

export const connect = reduxify(mapStateToProps);
