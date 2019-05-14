import { WithStyles } from '@material-ui/core';
import { styles } from '@pages/WishlistPage/styles';

export interface IWishlistPageProps extends WithStyles<typeof styles> {
    isLoading: boolean;
    isInitial: boolean;
    getWishlistsAction: () => void;
}
