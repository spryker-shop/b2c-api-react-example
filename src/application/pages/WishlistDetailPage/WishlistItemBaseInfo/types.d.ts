import { IWishlistProduct } from '@interfaces/wishlist';

import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishlistRowsProps extends WithStyles<typeof styles> {
    productItem: IWishlistProduct;
    renderProduct: Function;
}
