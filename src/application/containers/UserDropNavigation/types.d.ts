import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, WithRouter {
    isUserLoggedIn?: boolean;
    popoverPosLeft: number;
    popoverPosTop: number;
    logout?(): void;
}

export interface IUserDropNavigationState {
    anchorElement: HTMLElement | null;
}
