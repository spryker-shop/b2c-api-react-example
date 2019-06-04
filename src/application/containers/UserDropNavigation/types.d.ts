import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    isUserLoggedIn?: boolean;
    logoutAction?: () => void;
    isTouch?: boolean;
}

export interface IUserDropNavigationState {
    isPopupOpened: boolean;
    isContentHovered: boolean;
    isButtonHovered: boolean;
}
