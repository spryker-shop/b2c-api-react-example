import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IWishlist, TWishlistName } from '@interfaces/wishlist';
import { TProductSKU, TProductType } from '@interfaces/product';

export interface IProductConfiguratorAddToWishlistProps extends WithStyles<typeof styles> {
    getWishlists?: Function;
    addToWishlist?: Function;
    isWishlistsFetched?: boolean;
    isWishlistLoading?: boolean;
    wishlists?: IWishlist[];
    productType: TProductType | null;
    sku: TProductSKU | null;
}

export interface IProductConfiguratorAddToWishlistState {
    wishlistSelected: TWishlistName | null;
}
