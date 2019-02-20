import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IFormWrapperProps extends WithStyles<typeof styles> {
    title: string;
    isDisabled: boolean;
}

export interface IFormWrapperState {
    expanded: boolean | null;
}
