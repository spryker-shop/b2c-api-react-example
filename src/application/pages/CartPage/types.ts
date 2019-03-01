import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICartTotals } from '@interfaces/cart';

export interface CartPageProps extends WithStyles<typeof styles> {
    isCartEmpty: boolean;
    totalQty: number;
    totals: ICartTotals;
}
