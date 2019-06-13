import * as actionTypes from '@stores/actionTypes/common/cart';
import { CartService } from '@services/common/Cart';
import { ICartAddItem, ICartDataParsed } from '@interfaces/cart';
import { ICartAction, ICartCreatePayload } from '@stores/reducers/Common/Cart/types';

export const getCartsPendingStateAction = (): ICartAction => ({
    type: actionTypes.GET_CARTS + '_PENDING'
});

export const getCartsFulfilledStateAction = (payload: ICartDataParsed): ICartAction => ({
    type: actionTypes.GET_CARTS + '_FULFILLED',
    payloadCartItemFulfilled: payload
});

export const getCartsRejectedStateAction = (message: string): ICartAction => ({
    type: actionTypes.GET_CARTS + '_REJECTED',
    payloadRejected: { error: message }
});

export const getCustomerCartsAction = (anonymId?: string, isUserLoggedIn?: boolean, isCreateCart?: boolean): Function =>
    (dispatch: Function, getState: Function): void => {
        CartService.getCustomerCarts(dispatch, anonymId, isUserLoggedIn, isCreateCart, getState);
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

export const cartDeleteItemAction =
    (cartId: string, itemId: string, anonymId: string, isUserLoggedIn: boolean): Function =>
        (dispatch: Function, getState: Function): void => {
            CartService.cartDeleteItem(dispatch, cartId, itemId, anonymId, isUserLoggedIn);
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

export const addItemToCartAction =
    (payload: ICartAddItem, cartId: string, anonymId?: string, isUserLoggedIn?: boolean): Function =>
        (dispatch: Function, getState: Function): void => {
            CartService.cartAddItem(dispatch, payload, cartId, anonymId, isUserLoggedIn);
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

export const updateItemInCartAction =
    (payload: ICartAddItem, cartId: string, anonymId: string, isUserLoggedIn: boolean): Function =>
        (dispatch: Function, getState: Function): void => {
            CartService.cartUpdateItem(dispatch, payload, cartId, anonymId, isUserLoggedIn);
        };

export const updateCartFulfilledStateAction = (): ICartAction => ({
    type: actionTypes.CART_UPDATE_FULLFILLED_STATE
});
