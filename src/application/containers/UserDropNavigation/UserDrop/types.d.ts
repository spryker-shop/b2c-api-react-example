import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ClickEvent } from '@interfaces/common';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IUserDropProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    isUserLoggedIn?: boolean;
    onLogoutClick?: (event: ClickEvent) => void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}
