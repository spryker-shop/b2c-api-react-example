import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsExpenseItem } from '@interfaces/order';
import { ITotals } from '@interfaces/common';

interface ITotalsBlockProps extends WithStyles<typeof styles> {
    totals: ITotals;
    expenses?: IOrderDetailsExpenseItem[];
    isMinus?: boolean;
}
