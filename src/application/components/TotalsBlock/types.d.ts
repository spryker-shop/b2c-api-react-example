import { WithStyles } from '@material-ui/core';
import { ICartTotals } from '@interfaces/cart';
import { styles } from './styles';
import { IOrderDetailsExpenseItem } from '@interfaces/order';

interface ITotalsBlockProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
    expenses?: IOrderDetailsExpenseItem[] | null;
    isMinus?: boolean;
}
