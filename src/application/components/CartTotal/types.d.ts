import { WithStyles } from '@material-ui/core';
import { ICartTotals } from '@interfaces/cart';
import { styles } from './styles';

interface ICartTotalProps extends WithStyles<typeof styles> {
    totals: ICartTotals;
    title: string;
    extraClass?: string;
}
