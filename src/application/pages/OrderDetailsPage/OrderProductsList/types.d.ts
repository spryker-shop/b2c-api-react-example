import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IOrderDetailsParsed } from '@interfaces/order';

export interface IOrderProductListProps extends WithStyles<typeof styles> {
    items: IOrderDetailsParsed['items'];
}
