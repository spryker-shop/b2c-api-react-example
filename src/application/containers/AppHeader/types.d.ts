import { WithStyles } from '@material-ui/core/styles/withStyles';
import { WithRouter } from '@interfaces/common';
import { styles } from './styles';

export interface IAppHeaderState {
    headerHeight: number;
    isMobileNavOpened: boolean;
}

export interface IAppHeaderProps extends WithStyles<typeof styles>, WithRouter {
    isLoading: boolean;
    isLockedPage?: (value: boolean) => void;
}
