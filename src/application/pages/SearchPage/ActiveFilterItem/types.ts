import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IFilterItem } from '@application/pages/SearchPage/types';

export interface IActiveFilterItemProps extends WithStyles<typeof styles>, IFilterItem {}
