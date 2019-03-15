import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IPagination } from '@application/components/AppPagination/types';

export interface IFoundItemsProps extends WithStyles<typeof styles> {
    numberFound: IPagination['numFound'];
}
