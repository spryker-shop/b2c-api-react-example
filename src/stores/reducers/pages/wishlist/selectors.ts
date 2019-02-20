import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IWishlist } from '@interfaces/wishlist';

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageWishlist);
}

export function isPageWishlistStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.pageWishlist && state.pageWishlist.pending && state.pageWishlist.pending === true);
}

export function isWishlistDetailsStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageWishlist.rejected && state.pageWishlist.rejected === true);
}

export function isWishlistsCollectionExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageWishlist.data.wishlists);
}

export function getWishlistsCollectionFromStore(state: IReduxStore, props: IReduxOwnProps): IWishlist[] | null {
    return isWishlistsCollectionExist(state, props) ? state.pageWishlist.data.wishlists : null;
}

export function isWishlistsCollectionInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return isStateExist(state, props) ? state.pageWishlist.data.isInitialList : false;
}

export function isWishlistDetailsPresent(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(
        isStateExist(state, props)
        && state.pageWishlist.data
        && state.pageWishlist.data.currentWishlist
        && state.pageWishlist.data.currentWishlist.id
    );
}
