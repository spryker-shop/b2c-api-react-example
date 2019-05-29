import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Location } from 'history';
import { IWishlist } from '@interfaces/wishlist';

interface ICustomerSideBarProps extends WithStyles<typeof styles> {
    location: Location;
    wishlists?: IWishlist[];
}
