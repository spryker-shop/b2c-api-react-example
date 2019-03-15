import { IBreadcrumbItem } from '@interfaces/category';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IBreadcrumbsProps extends WithStyles<typeof styles> {
    breadcrumbsList: IBreadcrumbItem[];
}
