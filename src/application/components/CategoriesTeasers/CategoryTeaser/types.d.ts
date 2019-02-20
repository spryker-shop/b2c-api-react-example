import { WithStyles } from '@material-ui/core/styles/withStyles';
import { ICategoriesTeasersData } from '../types';
import { styles } from './styles';

export interface ICategoryTeaserProps extends WithStyles<typeof styles> {
    title: ICategoriesTeasersData['title'];
    text: ICategoriesTeasersData['text'];
    img: ICategoriesTeasersData['img'];
    path: ICategoriesTeasersData['path'];
    linkTitle: ICategoriesTeasersData['linkTitle'];
    isOdd: boolean;
}
