import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TCartId } from '@interfaces/cart';

export interface CartPageProps extends WithStyles<typeof styles> {
    dispatch: Function;
    isCartEmpty: boolean;
    totalQty: number;
    isUserLoggedIn: boolean;
    cartId: TCartId;
}
