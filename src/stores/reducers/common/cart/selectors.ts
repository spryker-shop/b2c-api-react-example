import { ICartItem, ICartTotals } from '@interfaces/cart';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

// Number of products(including quantity per each product) in the cart
export function getTotalProductsQuantity(state: IReduxStore, props: IReduxOwnProps): number {
  return state.cart.data.items.reduce((acc: number, item: ICartItem) =>
    acc + item.quantity, 0);
}

// Number of items in the cart
export function getTotalItemsQuantity(state: IReduxStore, props: IReduxOwnProps): number {
  return state.cart.data.totalQty;
}

export function isCartCreated(state: IReduxStore, props: IReduxOwnProps): boolean {
  return (state.cart.data.cartCreated);
}

export function isCartStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(state.cart && state.cart.pending && state.cart.pending === true);
}

export function isCartStateFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.cart.fulfilled && state.cart.fulfilled === true);
}

export function isCartStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(isStateExist(state, props) && state.cart.rejected && state.cart.rejected === true);
}

export function getCartId(state: IReduxStore, props: IReduxOwnProps): string {
  return (isCartCreated(state, props) && state.cart.data.id) ? state.cart.data.id : null;
}

export function getCartTotals(state: IReduxStore, props: IReduxOwnProps): ICartTotals | null {
  return isStateExist(state, props) ? state.cart.data.totals : null;
}

export function getProductsFromCart(state: IReduxStore, props: IReduxOwnProps): {items: ICartItem[], totalQty: number} {
  const items: ICartItem[] = isStateExist(state, props) ? state.cart.data.items : [];
  const totalQty: number = isStateExist(state, props) ? state.cart.data.totalQty : 0;

  return ({
    items,
    totalQty,
  });
}

// selectors INNER
function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
  return Boolean(state.cart);
}
