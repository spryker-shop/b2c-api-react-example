import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Location } from 'history';

interface ICustomerSideBarProps extends WithStyles<typeof styles> {
    location: Location;
}
