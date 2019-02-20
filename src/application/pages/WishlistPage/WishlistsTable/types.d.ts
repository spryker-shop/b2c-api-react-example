import { IWishlist } from '@interfaces/wishlist';

import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IWishlistsTableProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    wishlists: IWishlist[] | null;

    getWishlistsAction(): void;

    updateWishlistAction(wishlistId: string, name: string): void;

    deleteWishlistAction(wishlistId: string): void;
}

export interface IWishlistsTableState {
    updatedName: string;
    updatedList: string;
}
