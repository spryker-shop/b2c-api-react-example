import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IUserDropNavigationProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
}

export interface IUserDropNavigationState {
    anchorElement: HTMLElement;
}
