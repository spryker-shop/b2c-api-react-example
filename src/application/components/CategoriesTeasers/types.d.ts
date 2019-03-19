import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface ICategoriesTeasersData {
    title: string;
    text: string;
    img: string;
    path: string;
    linkTitle: string;
}

export interface ICategoriesTeasersProps extends WithStyles<typeof styles> {
    teasers: ICategoriesTeasersData[];
}
