import * as actionTypes from '@stores/actionTypes/common/cart';
import { CartService, GuestCartService } from '@services/common/Cart';
import { ICartAddItem, ICartDataParsed, ICartCreatePayload } from '@interfaces/cart';
import { ICartAction } from '@stores/reducers/Common/Cart/types';

export const getCartsPendingStateAction = (): ICartAction => ({
    type: actionTypes.GET_CARTS + '_PENDING'
});

export const getCartsFulfilledStateAction = (payload: ICartDataParsed | null): ICartAction => ({
    type: actionTypes.GET_CARTS + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const getCartsRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.GET_CARTS + '_REJECTED',
    payloadRejected: { error: message }
});

export const getCustomerCartsAction = () => (dispatch: Function, getState: Function) => {
    CartService.getCustomerCarts(dispatch);
};

export const getGuestCartAction = (anonymId: string) => (dispatch: Function, getState: Function) => {
    GuestCartService.getGuestCart(dispatch, anonymId);
};

export const cartDeleteItemPendingStateAction = (): ICartAction => ({
    type: actionTypes.CART_DELETE_ITEM + '_PENDING'
});

export const cartDeleteItemRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.CART_DELETE_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartDeleteItemFulfilledStateAction = (payload: { sku: string }): ICartAction => ({
    type: actionTypes.CART_DELETE_ITEM + '_FULFILLED',
    payloadCartDeleteItemFulfilled: payload
});

export const cartDeleteItemAction = (cartId: string, itemId: string) => (dispatch: Function, getState: Function) => {
    CartService.cartDeleteItem(dispatch, cartId, itemId);
};

export const removeItemGuestCartAction = (cartUid: string, sku: string, anonymId: string) =>
    (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartRemoveItem(dispatch, cartUid, sku, anonymId);
    };

export const cartAddItemPendingStateAction = (): ICartAction => ({
    type: actionTypes.CART_ADD_ITEM + '_PENDING'
});

export const cartAddItemFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: actionTypes.CART_ADD_ITEM + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const cartAddItemRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.CART_ADD_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const addItemToCartAction = (payload: ICartAddItem, cartId: string) =>
    (dispatch: Function, getState: Function) => {
        CartService.cartAddItem(dispatch, payload, cartId);
    };

export const addItemGuestCartAction = (payload: ICartAddItem, anonymId: string) =>
    (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartAddItem(dispatch, payload, anonymId);
    };

export const cartCreatePendingStateAction = (): ICartAction => ({
    type: actionTypes.CART_CREATE + '_PENDING'
});

export const cartCreateRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.CART_CREATE + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartCreateFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: actionTypes.CART_CREATE + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const createCartAndAddItemAction = (payloadCartCreate: ICartCreatePayload, item: ICartAddItem) =>
    (dispatch: Function, getState: Function) => {
        CartService.createCartAndAddItem(dispatch, payloadCartCreate, item);
    };

export const cartUpdateItemPendingStateAction = (): ICartAction => ({
    type: actionTypes.CART_UPDATE_ITEM + '_PENDING'
});

export const cartUpdateItemRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.CART_UPDATE_ITEM + '_REJECTED',
    payloadRejected: { error: message }
});

export const cartUpdateItemFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: actionTypes.CART_UPDATE_ITEM + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const updateItemInCartAction = (payload: ICartAddItem, cartId: string) =>
    (dispatch: Function, getState: Function) => {
        CartService.cartUpdateItem(dispatch, payload, cartId);
    };

export const updateGuestCartAction = (payload: ICartAddItem, cartId: string, anonymId: string) =>
    (dispatch: Function, getState: Function) => {
        GuestCartService.guestCartUpdate(dispatch, payload, cartId, anonymId);
    };

export const updateCartFulfilledStateAction = (): ICartAction => ({
    type: actionTypes.CART_UPDATE_FULLFILLED_STATE
});
