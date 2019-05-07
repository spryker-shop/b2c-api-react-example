import { IWishlist, TWishlistId } from '@interfaces/wishlist';
import { TCartId } from '@interfaces/cart';

import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishlistPageProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    isWishlistExist: boolean;
    isRejected: boolean;
    isAppDataSet: boolean;
    wishlist: IWishlist | null;
    wishlistIdParam: TWishlistId;

    multiItemsCartAction(cartId: TCartId, listItems: string[]): void;

    deleteMultiItemsAction(wishlistId: TWishlistId, items: string[]): void;

    getDetailWishlistAction(wishlistId: TWishlistId): void;
}

export interface WishlistPageState {
    multiProducts: string[];
}
