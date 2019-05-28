import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export type TNavigationItem = {
    name: string;
    path: string;
    formatted?: boolean;
};

export interface INavigationListProps extends WithStyles<typeof styles> {
    external?: boolean;
    title: string;
    navigationList: TNavigationItem[];
}

export interface INavigationListState {
    isOpen: boolean;
}
