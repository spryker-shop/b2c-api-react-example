import { LocationDescriptor, LocationState } from 'history';
import { RouterAction } from 'connected-react-router';

import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { ICartAddItem, TCartId } from '@interfaces/cart';
import { TAppCurrency } from '@interfaces/currency';

import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishListItemsTableProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    cartLoading: boolean;
    wishlist: IWishlist | null;
    products: IWishlistProduct[] | null;
    cartItemsLength: number;
    cartId: TCartId;
    currency: TAppCurrency;

    changeLocation(location: LocationDescriptor, state?: LocationState): RouterAction;

    addItemToCartAction(payload: ICartAddItem, cartId: TCartId): void;

    multiItemsCartAction(cartId: TCartId, listItems: string[]): void;

    deleteItemAction(wishlistId: string, sku: string): void;

    moveToCartHandler(cartId: TCartId, availableProducts: string[]): void;

    deleteMultiItemsHandler(cartItemsLength: number, prevCartItemsLength: number): void;
}

export interface WishListItemsTableState {
    movedItem: string;
}

export interface ItemPrices {
    default: string;
    original: string;
}
