import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { Location } from 'history';

interface SideBarProps extends WithStyles<typeof styles> {
    logout?: () => void;
    location: Location;
}
