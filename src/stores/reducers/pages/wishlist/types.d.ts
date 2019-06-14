import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface IWishlistState extends IReduxState {
    data: {
        wishlists: IWishlist[],
        currentWishlist: IWishlist,
        currentItems: IWishlistProduct[],
        isInitialList: boolean,
        isInitialDetail: boolean,
    };
}

export interface IPageWishlistAction extends IActionData {
    payloadWishlistDataFulfilled?: IPayloadWishlistData;
    payloadWishlistProductFulfilled?: IPayloadWishlistProduct;
}

export interface IPayloadWishlistData {
    data?: IWishlist;
    wishlistId?: string;
    products?: IWishlistProduct[];
    wishlists?: IWishlist[];
}

export interface IPayloadWishlistProduct {
    wishlistId: string;
    sku: string;
}
