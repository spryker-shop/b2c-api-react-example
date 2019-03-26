import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

interface IAppPageTitleProps extends WithStyles<typeof styles> {
    title: string;
}
