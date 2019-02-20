import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface CartPageProps extends WithStyles<typeof styles> {
    dispatch: Function;
    isCartEmpty: boolean;
    totalQty: number;
    isUserLoggedIn: boolean;
}
