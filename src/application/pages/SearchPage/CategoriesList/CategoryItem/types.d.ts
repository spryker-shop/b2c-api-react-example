import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface ICategoryItemProps extends WithStyles<typeof styles> {
    categoryValue: number | string;
    categoryName: string;
    quantity: string | number;
    isSelected: boolean;
    isActive: boolean;
    selectCategoryHandler: (categoryId: number | string) => Function;
}
