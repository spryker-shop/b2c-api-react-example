import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface ICheckoutThanksProps extends WithStyles<typeof styles> {
    orderId: string;
}
