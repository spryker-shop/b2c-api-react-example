import { styles } from '@pages/CustomerPage/styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { IWishlist } from '@interfaces/wishlist';
import { IBreadcrumbItem } from '@interfaces/common';

export interface ICustomerPageProps extends WithStyles<typeof styles>, WithRouter {
    isWishlistsInitial?: boolean;
    getWishlistsAction?: () => void;
    clearOrdersCollectionAction?: () => void;
    clearAddressAction?: () => void;
    isWishlistsDetailInitial?: boolean;
    wishlist: IWishlist | null;
}

export interface ICustomerPageState {
    breadcrumbsList: IBreadcrumbItem[];
}
