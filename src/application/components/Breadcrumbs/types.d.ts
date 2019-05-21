import { IBreadcrumbItem } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IBreadcrumbsProps extends WithStyles<typeof styles> {
    breadcrumbsList: IBreadcrumbItem[];
}
