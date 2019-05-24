import {
    CART_ADD_ITEM,
    CART_CREATE,
    CART_DELETE_ITEM,
    CART_UPDATE_ITEM,
    GET_CARTS,
    CART_UPDATE_FULLFILLED_STATE
} from '@stores/actionTypes/common/cart';
import { CartService, GuestCartService } from '@services/common/Cart';
import { ICartAddItem, ICartDataParsed, ICartCreatePayload } from '@interfaces/cart';
import { ICartAction } from '@stores/reducers/Common/Cart/types';

export const updateCartFulfilledStateAction = (): ICartAction => ({
    type: CART_UPDATE_FULLFILLED_STATE
});

export const addItemToCartAction = function (payload: ICartAddItem, cartId: string) {
    return (dispatch: Function, getState: Function) =>
        CartService.cartAddItem(dispatch, payload, cartId);
};

export const getCartsPendingStateAction = (): ICartAction => ({
    type: GET_CARTS + '_PENDING'
});

export const getCartsFulfilledStateAction = (payload: ICartDataParsed | null): ICartAction => ({
    type: GET_CARTS + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const getCartsRejectedStateAction = (message: string): ICartAction => ({
    type: GET_CARTS + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartAddItemPendingStateAction = (): ICartAction => ({
    type: CART_ADD_ITEM + '_PENDING'
});

export const cartDeleteItemPendingStateAction = (): ICartAction => ({
    type: CART_DELETE_ITEM + '_PENDING'
});

export const cartDeleteItemRejectedStateAction = (message: string): ICartAction => ({
    type: CART_DELETE_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartDeleteItemFulfilledStateAction = (payload: { sku: string }): ICartAction => ({
    type: CART_DELETE_ITEM + '_FULFILLED',
    payloadCartDeleteItemFulfilled: payload
});

export const cartAddItemFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: CART_ADD_ITEM + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const cartAddItemRejectedStateAction = (message: string): ICartAction => ({
    type: CART_ADD_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartCreatePendingStateAction = (): ICartAction => ({
    type: CART_CREATE + '_PENDING'
});

export const cartCreateRejectedStateAction = (message: string): ICartAction => ({
    type: CART_CREATE + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartCreateFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: CART_CREATE + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const cartDeleteItemAction = function (cartId: string, itemId: string) {
    return (dispatch: Function, getState: Function) => {
        CartService.cartDeleteItem(dispatch, cartId, itemId);
    };
};

export const cartUpdateItemPendingStateAction = (): ICartAction => ({
    type: CART_UPDATE_ITEM + '_PENDING'
});

export const cartUpdateItemRejectedStateAction = (message: string): ICartAction => ({
    type: CART_UPDATE_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartUpdateItemFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: CART_UPDATE_ITEM + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const updateItemInCartAction = function (payload: ICartAddItem, cartId: string) {
    return (dispatch: Function, getState: Function) => {
        CartService.cartUpdateItem(dispatch, payload, cartId);
    };
};

export const multiItemsCartAction = function (cartId: string, listItems: string[]) {
    return (dispatch: Function, getState: Function) => {
        CartService.moveItemsToCart(dispatch, cartId, listItems);
    };
};

export const getCustomerCartsAction = function () {
    return (dispatch: Function, getState: Function) => {
        dispatch(getCartsPendingStateAction());
        CartService.getCustomerCarts(dispatch);
    };
};

export const createCartAndAddItemAction = function (payloadCartCreate: ICartCreatePayload, item: ICartAddItem) {
    return (dispatch: Function, getState: Function) => {
        CartService.createCartAndAddItem(dispatch, payloadCartCreate, item);
    };
};

export const getGuestCartAction = function (anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        GuestCartService.getGuestCart(dispatch, anonymId);
    };
};

export const addItemGuestCartAction = function (payload: ICartAddItem, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartAddItem(dispatch, payload, anonymId);
    };
};

export const removeItemGuestCartAction = function (cartUid: string, sku: string, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartRemoveItem(dispatch, cartUid, sku, anonymId);
    };
};

export const updateGuestCartAction = function (payload: ICartAddItem, cartId: string, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartUpdate(dispatch, payload, cartId, anonymId);
    };
};
