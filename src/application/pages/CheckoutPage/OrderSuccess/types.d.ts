import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface OrderSuccessProps extends WithStyles<typeof styles> {
    order: string;
}
