import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface IBannerProps extends WithStyles<typeof styles> {
    titleFirst: string | JSX.Element;
    titleSecond?: string | JSX.Element;
    intro: string | JSX.Element;
    linkPath: string;
    linkTitle: string | JSX.Element;
    imagePath: string;
}
