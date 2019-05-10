import { IWishlist } from '@interfaces/wishlist';
import { WithRouter } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IWishlistPageProps extends WithStyles<typeof styles>, WithRouter {
    isLoading: boolean;
    isWishlistExist: boolean;
    isRejected: boolean;
    isAppDataSet: boolean;
    wishlist: IWishlist | null;
    wishlistIdParam: string;
    getDetailWishlistAction: (wishlistId: string) => void;
}
