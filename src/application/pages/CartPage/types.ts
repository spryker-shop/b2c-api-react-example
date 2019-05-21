import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAbstractTotals } from '@interfaces/abstract';

export interface CartPageProps extends WithStyles<typeof styles> {
    isCartEmpty: boolean;
    totalQty: number;
    totals: IAbstractTotals;
    cartId: string;
    clearCheckoutDataForm: () => void;
}
