import { IWishlist } from '@interfaces/wishlist';

import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface WishListMenuProps extends WithStyles<typeof styles> {
    wishlist: IWishlist | null;
}
