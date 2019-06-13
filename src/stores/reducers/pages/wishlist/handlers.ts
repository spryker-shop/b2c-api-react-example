import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { IPayloadWishlistData, IPayloadWishlistProduct, IWishlistState } from '@stores/reducers/pages/wishlist/types';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';

export const handleFulfilled = (state: IWishlistState, payload: IWishlist[]): IWishlistState => ({
    ...state,
    data: {
        ...state.data,
        wishlists: payload,
        isInitialList: true
    },
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: IWishlistState, payload: IApiErrorResponse): IWishlistState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: IWishlistState): IWishlistState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleWishlistDetailPending = (state: IWishlistState): IWishlistState => ({
    ...state,
    data: {
        ...state.data,
        isInitialDetail: false
    },
    ...getReducerPartPending()
});

export const handleWishlistDetailRejected = (state: IWishlistState, payload: IApiErrorResponse): IWishlistState => ({
    ...state,
    data: {
        ...state.data,
        isInitialDetail: false
    },
    ...getReducerPartRejected(payload.error)
});

export const handleWishlistDetailFulfilled = (
    state: IWishlistState,
    payload: IPayloadWishlistData
): IWishlistState => ({
    ...state,
    data: {
        ...state.data,
        currentWishlist: payload.data,
        currentItems: payload.products,
        isInitialDetail: true
    },
    ...getReducerPartFulfilled()
});

export const handleAddWishlistFulfilled = (state: IWishlistState, payload: IWishlist): IWishlistState => ({
    ...state,
    data: {
        ...state.data,
        wishlists: [...state.data.wishlists, payload],
        isInitialList: true
    },
    ...getReducerPartFulfilled()
});

export const handleUpdateWishlistFulfilled = (state: IWishlistState, payload: IPayloadWishlistData): IWishlistState => {
    const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) =>
        wishlist.id === payload.wishlistId ? payload.data : wishlist);

    return {
        ...state,
        data: {
            ...state.data,
            wishlists,
            isInitialList: true
        },
        ...getReducerPartFulfilled()
    };
};

export const handleDeleteWishlistFulfilled = (state: IWishlistState, payload: IPayloadWishlistData): IWishlistState => {
    const wishlists: IWishlist[] = state.data.wishlists.filter((wishlist: IWishlist) =>
        wishlist.id !== payload.wishlistId);

    return {
        ...state,
        data: {
            ...state.data,
            wishlists,
            isInitialList: true
        },
        ...getReducerPartFulfilled()
    };
};

export const handleAddItemWishlistFulfilled = (
    state: IWishlistState,
    payload: IPayloadWishlistData
): IWishlistState => {
    const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) =>
        wishlist.id === payload.data.id ? payload.data : wishlist);

    return {
        ...state,
        data: {
            ...state.data,
            wishlists
        },
        ...getReducerPartFulfilled()
    };
};

export const handleDeleteItemWishlistFulfilled = (
    state: IWishlistState,
    payload: IPayloadWishlistProduct
): IWishlistState => {
    const currentItems: IWishlistProduct[] = Boolean(state.data.currentItems) && state.data.currentItems
        .filter((item: IWishlistProduct) => item.sku !== payload.sku);

    const wishlists: IWishlist[] = state.data.wishlists.map((wishlist: IWishlist) =>
        wishlist.id === payload.wishlistId ? {...wishlist, numberOfItems: currentItems.length} : wishlist);

    return {
        ...state,
        data: {
            ...state.data,
            wishlists,
            currentItems
        },
        ...getReducerPartFulfilled()
    };
};
