import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, WithRouter {
}

export interface IUserDropNavigationState {
    anchorElement: HTMLElement;
}
