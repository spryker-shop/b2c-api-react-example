import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ITotals } from '@interfaces/common';

export interface OrderSummaryProps extends WithStyles<typeof styles> {
    totals: ITotals;
    clearCheckoutDataForm: () => void;
}
