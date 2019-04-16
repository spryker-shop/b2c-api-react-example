import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICartTotals } from '@interfaces/cart';
import { styles } from './styles';

export interface OrderSummaryProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
    clearCheckoutDataForm: () => void;
}
