import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ClickEvent, WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IUserDropProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    onLogoutClick?: (event: ClickEvent) => void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}
