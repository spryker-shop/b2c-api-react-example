import { LocationDescriptor, LocationState } from 'history';
import { RouterAction } from 'connected-react-router';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { ICartAddItem } from '@interfaces/cart';
import { TAppCurrency } from '@interfaces/currency';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishlistProductsListProps extends WithStyles<typeof styles> {
    isLoading?: boolean;
    isCartLoading?: boolean;
    wishlist?: IWishlist | null;
    products?: IWishlistProduct[] | null;
    cartItemsLength?: number;
    cartId?: string;
    currency?: TAppCurrency;
    changeLocation?: (location: LocationDescriptor, state?: LocationState) => RouterAction;
    addItemToCartAction?: (payload: ICartAddItem, cartId: string) => void;
    multiItemsCartAction?: (cartId: string, listItems: string[]) => void;
    deleteItemAction?: (wishlistId: string, sku: string) => void;
}
