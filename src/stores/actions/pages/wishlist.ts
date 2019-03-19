import {
    ADD_ITEM_WISHLIST,
    ADD_WISHLIST,
    DELETE_ITEM_WISHLIST,
    DELETE_WISHLIST,
    DETAIL_WISHLIST,
    UPDATE_WISHLIST,
    WISHLIST_ALL_LISTS,
} from '@stores/actionTypes/pages/wishlist';
import { WishlistService } from '@services/pages/Wishlist';
import { TWishlistId } from '@interfaces/wishlist';

export const getAllListPendingState = {
    type: WISHLIST_ALL_LISTS + '_PENDING',
};

export const addWishlistPendingState = {
    type: ADD_WISHLIST + '_PENDING',
};

export const updateWishlistPendingState = {
    type: UPDATE_WISHLIST + '_PENDING',
};

export const deleteWishlistPendingState = {
    type: DELETE_WISHLIST + '_PENDING',
};

export const detailWishlistPendingState = {
    type: DETAIL_WISHLIST + '_PENDING',
};

export const deleteItemPendingState = {
    type: DELETE_ITEM_WISHLIST + '_PENDING',
};

export const addItemPendingState = {
    type: ADD_ITEM_WISHLIST + '_PENDING',
};

export const getWishlistsAction = function () {
    return (dispatch: Function, getState: Function) => {
        dispatch(getAllListPendingState);
        WishlistService.getLists(WISHLIST_ALL_LISTS, dispatch);
    };
};

export const addWishlistAction = function (name: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(addWishlistPendingState);
        WishlistService.addWishlist(ADD_WISHLIST, dispatch, name);
    };
};

export const updateWishlistAction = function (wishlistId: string, name: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(updateWishlistPendingState);
        WishlistService.updateWishlist(UPDATE_WISHLIST, dispatch, wishlistId, name);
    };
};

export const deleteWishlistAction = function (wishlistId: TWishlistId) {
    return (dispatch: Function, getState: Function) => {
        dispatch(deleteWishlistPendingState);
        WishlistService.deleteWishlist(DELETE_WISHLIST, dispatch, wishlistId);
    };
};

export const getDetailWishlistAction = function (wishlistId: TWishlistId) {
    return (dispatch: Function, getState: Function) => {
        dispatch(detailWishlistPendingState);
        WishlistService.getWishlist(DETAIL_WISHLIST, dispatch, wishlistId);
    };
};

export const deleteItemAction = function (wishlistId: TWishlistId, sku: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(deleteItemPendingState);
        WishlistService.deleteItemWishlist(DELETE_ITEM_WISHLIST, dispatch, wishlistId, sku);
    };
};

export const addItemAction = function (wishlistId: TWishlistId, sku: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(addItemPendingState);
        WishlistService.addItemWishlist(ADD_ITEM_WISHLIST, dispatch, wishlistId, sku);
    };
};

export const deleteMultiItemsAction = function (wishlistId: TWishlistId, items: string[]) {
    return (dispatch: Function, getState: Function) => {
        WishlistService.removeMultiItems(dispatch, wishlistId, items);
    };
};
