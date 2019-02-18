import { WithStyles } from '@material-ui/core';
import { styles } from 'src/shared/components/Pages/WishlistDetail/styles';
import { IWishlist, IWishlistProduct, TWishListId } from 'src/shared/interfaces/wishlist';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import { LocationDescriptor, LocationState } from 'history';
import { RouterAction } from 'connected-react-router';
import { TAppCurrency } from 'src/shared/interfaces/currency';

export interface WishlistPageProps extends WithStyles<typeof styles> {
    wishlist: IWishlist | null;
    products: IWishlistProduct[] | null;
    isLoading: boolean;
    isRejected: boolean;
    currency: TAppCurrency;
    cartLoading: boolean;
    cartId: TCartId;
    cartItemsLength: number;
    wishlistIdParam: TWishListId;
    isAppDataSet: boolean;
    changeLocation(location: LocationDescriptor, state?: LocationState): RouterAction;
    isWishlistExist: boolean;
    deleteItemAction(wishlistId: string, sku: string): void;

    addItemToCartAction(payload: ICartAddItem, cartId: TCartId): void;

    multiItemsCartAction(cartId: TCartId, listItems: string[]): void;

    deleteMultiItemsAction(wishlistId: TWishListId, items: string[]): void;

    getDetailWishlistAction(wishlistId: TWishListId): void;
}

export interface WishlistPageState {
    movedItem: string;
    multiProducts: string[];
}
