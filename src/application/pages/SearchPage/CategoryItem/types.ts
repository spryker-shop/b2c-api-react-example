import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TCategoryId } from '@application/pages/SearchPage/types';

export interface ICategoryItemProps extends WithStyles<typeof styles> {
    categoryValue: TCategoryId;
    displayName: string;
    isSelected: boolean;
    isActive: boolean;
}
