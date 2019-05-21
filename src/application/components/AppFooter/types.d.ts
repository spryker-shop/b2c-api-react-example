import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICategory } from '@interfaces/common';

export interface IAppFooterProps extends WithStyles<typeof styles> {
    categoriesTree: ICategory[];
}
