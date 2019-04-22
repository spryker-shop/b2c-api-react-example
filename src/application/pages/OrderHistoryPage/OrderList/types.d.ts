import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IOrderItem } from '@interfaces/order';

export interface IOrderListProps extends WithStyles<typeof styles> {
    orders: IOrderItem[] | null;
}
