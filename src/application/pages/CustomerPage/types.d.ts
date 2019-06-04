import { styles } from '@pages/CustomerPage/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IBreadcrumbItem } from '@interfaces/common';
import { IWishlist } from '@interfaces/wishlist';
import { RouteComponentProps } from 'react-router-dom';

export interface ICustomerPageProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    isWishlistsInitial?: boolean;
    getWishlistsAction?: () => void;
    clearOrdersCollectionAction?: () => void;
    clearAddressAction?: () => void;
    isWishlistsDetailInitial?: boolean;
    wishlist: IWishlist;
}

export interface ICustomerPageState {
    breadcrumbsList: IBreadcrumbItem[];
}
