import * as actionTypes from '@stores/actionTypes/pages/wishlist';
import * as wishlistHandlers  from '@stores/reducers/pages/wishlist/handlers';
import { IPageWishlistAction, IWishlistState } from '@stores/reducers/pages/wishlist/types';

export const initialState: IWishlistState = {
    data: {
        wishlists: [],
        currentWishlist: null,
        currentItems: [],
        isInitialList: false,
        isInitialDetail: false
    }
};

export const pageWishlist = (state: IWishlistState = initialState, action: IPageWishlistAction): IWishlistState => {
    switch (action.type) {
        case `${actionTypes.WISHLIST_ALL_LISTS}_PENDING`:
        case `${actionTypes.ADD_WISHLIST}_PENDING`:
        case `${actionTypes.DELETE_WISHLIST}_PENDING`:
        case `${actionTypes.UPDATE_WISHLIST}_PENDING`:
        case `${actionTypes.DELETE_ITEM_WISHLIST}_PENDING`:
        case `${actionTypes.ADD_ITEM_WISHLIST}_PENDING`:
            return wishlistHandlers.handlePending(state);
        case `${actionTypes.DETAIL_WISHLIST}_PENDING`:
            return wishlistHandlers.handleWishlistDetailPending(state);
        case `${actionTypes.WISHLIST_ALL_LISTS}_REJECTED`:
        case `${actionTypes.ADD_WISHLIST}_REJECTED`:
        case `${actionTypes.DELETE_WISHLIST}_REJECTED`:
        case `${actionTypes.UPDATE_WISHLIST}_REJECTED`:
            return wishlistHandlers.handleWishlistDetailRejected(state, action.payloadRejected);
        case `${actionTypes.DETAIL_WISHLIST}_REJECTED`:
        case `${actionTypes.DELETE_ITEM_WISHLIST}_REJECTED`:
        case `${actionTypes.ADD_ITEM_WISHLIST}_REJECTED`:
            return wishlistHandlers.handleRejected(state, action.payloadRejected);
        case `${actionTypes.WISHLIST_ALL_LISTS}_FULFILLED`:
            return wishlistHandlers.handleFulfilled(state, action.payloadWishlistDataFulfilled.wishlists);
        case `${actionTypes.ADD_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleAddWishlistFulfilled(state, action.payloadWishlistDataFulfilled.data);
        case `${actionTypes.DELETE_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleDeleteWishlistFulfilled(state, action.payloadWishlistDataFulfilled);
        case `${actionTypes.UPDATE_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleUpdateWishlistFulfilled(state, action.payloadWishlistDataFulfilled);
        case `${actionTypes.DETAIL_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleWishlistDetailFulfilled(state, action.payloadWishlistDataFulfilled);
        case `${actionTypes.ADD_ITEM_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleAddItemWishlistFulfilled(state, action.payloadWishlistDataFulfilled);
        case `${actionTypes.DELETE_ITEM_WISHLIST}_FULFILLED`:
            return wishlistHandlers.handleDeleteItemWishlistFulfilled(state, action.payloadWishlistProductFulfilled);
        case actionTypes.CLEAR_WISHLIST_STATE:
            return initialState;
        default:
            return state;
    }
};
