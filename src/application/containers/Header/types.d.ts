import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface IHeaderState {
    headerHeight: number;
    isMobileNavOpened: boolean;
}

export interface IHeaderProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    isLoading?: boolean;
    isPageLockedFulfilledState?: (value: boolean) => void;
}
