import { WithStyles } from '@material-ui/core';
import { styles } from '@pages/CustomerWishlists/styles';

export interface ICustomerWishlistsProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    isInitial: boolean;
    getWishlistsAction: () => void;
}
