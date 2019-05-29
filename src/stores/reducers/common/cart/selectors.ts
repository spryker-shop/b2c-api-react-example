import { ICartItem } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ITotals } from '@interfaces/common';

export const getTotalProductsQuantity = (state: IReduxStore, props: IReduxOwnProps): number =>
    state.cart.data.items.reduce((accumulator: number, item: ICartItem) => accumulator + item.quantity, 0);

export const getTotalItemsQuantity = (state: IReduxStore, props: IReduxOwnProps): number => state.cart.data.totalQty;

export const isCartCreated = (state: IReduxStore, props: IReduxOwnProps): boolean => state.cart.data.cartCreated;

export const isCartStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(state.cart && state.cart.pending && state.cart.pending === true);

export const getCartId = (state: IReduxStore, props: IReduxOwnProps): string =>
    isCartCreated(state, props) && state.cart.data.id ? state.cart.data.id : null;

export const getCartTotals = (state: IReduxStore, props: IReduxOwnProps): ITotals | null =>
    isStateExist(state, props) ? state.cart.data.totals : null;

export const getProductsFromCart = (
    state: IReduxStore,
    props: IReduxOwnProps
): { items: ICartItem[], totalQty: number } => {
    const items: ICartItem[] = isStateExist(state, props) ? state.cart.data.items : [];
    const totalQty: number = isStateExist(state, props) ? state.cart.data.totalQty : 0;

    return {
        items,
        totalQty
    };
};

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.cart);
