import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IWishlist } from '@interfaces/wishlist';
import { TProductType } from '@interfaces/product';

export interface IProductConfiguratorAddToWishlistProps extends WithStyles<typeof styles> {
    getWishlistsAction?: Function;
    addItemWishlistAction?: Function;
    isWishlistsFetched?: boolean;
    isWishlistLoading?: boolean;
    wishlists?: IWishlist[];
    productType: TProductType | null;
    sku: string | null;
}

export interface IProductConfiguratorAddToWishlistState {
    wishlistSelected: string | null;
}
