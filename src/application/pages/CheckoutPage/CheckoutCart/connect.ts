import { reduxify } from '@application/hoc/Reduxify';
import { getCartTotals, getProductsFromCart } from '@stores/reducers/common/cart/selectors';
import { getCustomerCartsAction, getGuestCartAction } from '@stores/actions/common/cart';
import { getAppLocale } from '@stores/reducers/common/init/selectors';
import { ICartItem, ICartTotals } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const totals: ICartTotals = getCartTotals(state, ownProps);
    const {items: products}: {items: ICartItem[]} = getProductsFromCart(state, ownProps);
    const locale = getAppLocale(state, ownProps);

    return {
        products,
        totals,
        locale
    };
};

const mapDispatchToProps = (dispatch: Function) => ({
    dispatch,
    updateCart: (): void => dispatch(getCustomerCartsAction()),
    updateGuestCart: (anonymId: string): void => {
        dispatch(getGuestCartAction(anonymId));
    }
});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
