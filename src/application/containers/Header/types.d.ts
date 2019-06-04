import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IHeaderState {
    headerHeight: number;
    isMobileNavOpened: boolean;
}

export interface IHeaderProps extends WithStyles<typeof styles>, WithRouter {
    isLoading?: boolean;
    isPageLockedFulfilledState?: (value: boolean) => void;
}
