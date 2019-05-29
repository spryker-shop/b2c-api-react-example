import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { ICartAddItem } from '@interfaces/cart';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishlistProductsListProps extends WithStyles<typeof styles> {
    isLoading?: boolean;
    isCartLoading?: boolean;
    wishlist?: IWishlist;
    products?: IWishlistProduct[];
    cartItemsLength?: number;
    cartId?: string;
    currency?: string;
    addItemToCartAction?: (payload: ICartAddItem, cartId: string) => void;
    deleteItemWishlistAction?: (wishlistId: string, sku: string) => void;
}
