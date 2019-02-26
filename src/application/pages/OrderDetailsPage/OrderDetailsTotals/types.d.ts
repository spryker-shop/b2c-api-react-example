import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from '@interfaces/order';

export interface IOrderDetailsTotalsProps extends WithStyles<typeof styles> {
    expenses: IOrderDetailsParsed['expenses'];
    totals: IOrderDetailsParsed['totals'];
}
