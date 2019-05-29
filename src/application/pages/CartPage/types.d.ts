import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ITotals } from '@interfaces/common';

export interface CartPageProps extends WithStyles<typeof styles> {
    isCartEmpty: boolean;
    totalQty: number;
    totals: ITotals;
    cartId: string;
    clearCheckoutDataForm: () => void;
}
