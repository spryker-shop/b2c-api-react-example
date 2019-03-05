import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IUserDropProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    logout?(): void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}
