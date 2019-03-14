import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TAppLocale } from '@interfaces/locale';
import { IMainNavigationNode } from '@interfaces/navigations';

export interface IMainNavProps extends WithStyles<typeof styles> {
    locale: TAppLocale;
    mobileNavState: boolean;
    getMainNavigationAction: () => void;
    nodesTree: IMainNavigationNode[];
}
