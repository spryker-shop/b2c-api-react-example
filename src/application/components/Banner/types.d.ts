import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IBannerProps extends WithStyles<typeof styles> {
    titleFirst: string;
    titleSecond?: string;
    intro: string;
    linkPath: string;
    linkTitle: string;
    imagePath: string;
}
