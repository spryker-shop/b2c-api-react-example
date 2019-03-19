import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IAppBtnLinkProps extends WithStyles<typeof styles> {
    title: string;
    path: string;
    extraClassName?: string;
    type?: 'white' | 'black';
}
