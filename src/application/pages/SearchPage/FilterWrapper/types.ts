import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IFilterWrapperProps extends WithStyles<typeof styles> {
    filter: JSX.Element;
    keyValue: string;
}
