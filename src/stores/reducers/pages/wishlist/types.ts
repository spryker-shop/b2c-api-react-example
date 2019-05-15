import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { IActionData, IReduxState } from '@stores/reducers/types';

export interface WishlistState extends IReduxState {
    data: {
        wishlists: IWishlist[],
        currentWishlist: IWishlist | null,
        currentItems: IWishlistProduct[],
        isInitialList: boolean,
        isInitialDetail: boolean,
    };
}

export interface IPageWishlistAction extends IActionData {
    payloadWishlistDataFulfilled?: {
        data?: IWishlist;
        wishlistId?: string;
        products?: IWishlistProduct[];
        wishlists?: IWishlist[]
    };
    payloadWishlistProductFulfilled?: {
        wishlistId: string;
        sku: string
    };
}
