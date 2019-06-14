import * as actionTypes from '@stores/actionTypes/pages/wishlist';
import { WishlistService } from '@services/pages/Wishlist';
import { IPageWishlistAction } from '@stores/reducers/pages/wishlist/types';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';

export const getWishlistsPendingState = (): IPageWishlistAction => ({
    type: actionTypes.WISHLIST_ALL_LISTS + '_PENDING'
});

export const getWishlistsFulfilledState = (wishlists: IWishlist[]): IPageWishlistAction => ({
    type: actionTypes.WISHLIST_ALL_LISTS + '_FULFILLED',
    payloadWishlistDataFulfilled: { wishlists }
});

export const getWishlistsRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.WISHLIST_ALL_LISTS + '_REJECTED',
    payloadRejected: { error: message }
});

export const getWishlistsAction = (): Function => (dispatch: Function, getState: Function): void => {
    WishlistService.getWishlists(dispatch);
};

export const getDetailWishlisPendingState = (): IPageWishlistAction => ({
    type: actionTypes.DETAIL_WISHLIST + '_PENDING'
});

export const getDetailWishlisFulfilledState =
    (wishlist: IWishlist, products: IWishlistProduct[]): IPageWishlistAction => ({
        type: actionTypes.DETAIL_WISHLIST + '_FULFILLED',
        payloadWishlistDataFulfilled: { data: wishlist, products }
    });

export const getDetailWishlisRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.DETAIL_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const getDetailWishlistAction = (wishlistId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        WishlistService.getDetailWishlist(dispatch, wishlistId);
    };

export const addWishlistPendingState = (): IPageWishlistAction => ({
    type: actionTypes.ADD_WISHLIST + '_PENDING'
});

export const addWishlistFulfilledState = (wishlist: IWishlist): IPageWishlistAction => ({
    type: actionTypes.ADD_WISHLIST + '_FULFILLED',
    payloadWishlistDataFulfilled: { data: wishlist }
});

export const addWishlistRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.ADD_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const addWishlistAction = (name: string): Function => (dispatch: Function, getState: Function): void => {
    WishlistService.addWishlist(dispatch, name);
};

export const deleteWishlistPendingState = (): IPageWishlistAction => ({
    type: actionTypes.DELETE_WISHLIST + '_PENDING'
});

export const deleteWishlistFulfilledState = (wishlistId: string): IPageWishlistAction => ({
    type: actionTypes.DELETE_WISHLIST + '_FULFILLED',
    payloadWishlistDataFulfilled: { wishlistId }
});

export const deleteWishlistRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.DELETE_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const deleteWishlistAction = (wishlistId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        WishlistService.deleteWishlist(dispatch, wishlistId);
    };

export const updateWishlistPendingState = (): IPageWishlistAction => ({
    type: actionTypes.UPDATE_WISHLIST + '_PENDING'
});

export const updateWishlistFulfilledState = (wishlist: IWishlist, wishlistId: string): IPageWishlistAction => ({
    type: actionTypes.UPDATE_WISHLIST + '_FULFILLED',
    payloadWishlistDataFulfilled: { data: wishlist, wishlistId }
});

export const updateWishlistRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.UPDATE_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const updateWishlistAction = (wishlistId: string, name: string): Function =>
    (dispatch: Function, getState: Function): void => {
        WishlistService.updateWishlist(dispatch, wishlistId, name);
    };

export const addItemWishlistPendingState = (): IPageWishlistAction => ({
    type: actionTypes.ADD_ITEM_WISHLIST + '_PENDING'
});

export const addItemWishlistFulfilledState = (wishlist: IWishlist): IPageWishlistAction => ({
    type: actionTypes.ADD_ITEM_WISHLIST + '_FULFILLED',
    payloadWishlistDataFulfilled: { data: wishlist }
});

export const addItemWishlistRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.ADD_ITEM_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const addItemWishlistAction = (wishlistId: string, sku: string): Function =>
    (dispatch: Function, getState: Function): void => {
        WishlistService.addItemWishlist(dispatch, wishlistId, sku);
    };

export const deleteItemWishlistPendingState = (): IPageWishlistAction => ({
    type: actionTypes.DELETE_ITEM_WISHLIST + '_PENDING'
});

export const deleteItemWishlistFulfilledState = (wishlistId: string, sku: string): IPageWishlistAction => ({
    type: actionTypes.DELETE_ITEM_WISHLIST + '_FULFILLED',
    payloadWishlistProductFulfilled: { wishlistId, sku }
});

export const deleteItemWishlistRejectedState = (message: string): IPageWishlistAction => ({
    type: actionTypes.DELETE_ITEM_WISHLIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const deleteItemWishlistAction = (wishlistId: string, sku: string): Function =>
    (dispatch: Function, getState: Function): void => {
        WishlistService.deleteItemWishlist(dispatch, wishlistId, sku);
    };

export const clearWishlistState = () => ({
    type: actionTypes.CLEAR_WISHLIST_STATE
});
