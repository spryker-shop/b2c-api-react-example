import { IWishlist } from '@interfaces/wishlist';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface ICustomerWishlistsProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    isLoading: boolean;
    isWishlistExist: boolean;
    isRejected: boolean;
    isAppDataSet: boolean;
    wishlist: IWishlist;
    wishlistIdParam: string;
    getDetailWishlistAction: (wishlistId: string) => void;
}
