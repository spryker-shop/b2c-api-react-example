import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsExpenseItem } from '@interfaces/order';
import { IAbstractTotals } from '@interfaces/abstract';

interface ITotalsBlockProps extends WithStyles<typeof styles> {
    totals: IAbstractTotals;
    expenses?: IOrderDetailsExpenseItem[] | null;
    isMinus?: boolean;
}
