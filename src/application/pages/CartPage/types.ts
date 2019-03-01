import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface CartPageProps extends WithStyles<typeof styles> {
    isCartEmpty: boolean;
    totalQty: number;
}
