import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IWishlist } from '@interfaces/wishlist';

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.pageWishlist);

export const isPageWishlistStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    state.pageWishlist && state.pageWishlist.pending && state.pageWishlist.pending === true;

export const isWishlistDetailsStateRejected = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageWishlist.rejected && state.pageWishlist.rejected === true);

export const isWishlistsCollectionExist = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageWishlist.data.wishlists);

export const getWishlistsCollectionFromStore = (state: IReduxStore, props: IReduxOwnProps): IWishlist[] =>
    isWishlistsCollectionExist(state, props) ? state.pageWishlist.data.wishlists : null;

export const isWishlistsCollectionInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    isStateExist(state, props) ? state.pageWishlist.data.isInitialList : false;

export const isWishlistDetailsPresent = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageWishlist.data && state.pageWishlist.data.currentWishlist &&
        state.pageWishlist.data.currentWishlist.id);
