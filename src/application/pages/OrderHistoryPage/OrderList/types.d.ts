import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TOrderCollection } from '@interfaces/order';

export interface IOrderListProps extends WithStyles<typeof styles> {
    orders: TOrderCollection;
}
