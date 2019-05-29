import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAbstractTotals } from '@interfaces/abstract';

export interface OrderSummaryProps extends WithStyles<typeof styles> {
    totals: IAbstractTotals;
    clearCheckoutDataForm: () => void;
}
