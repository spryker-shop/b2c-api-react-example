import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    logoutAction?: () => void;
    isTouch?: boolean;
}

export interface IUserDropNavigationState {
    isPopupOpened: boolean;
    isContentHovered: boolean;
    isButtonHovered: boolean;
}
