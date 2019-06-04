import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IMainNavigationNode } from '@interfaces/navigations';
import { RouteComponentProps } from 'react-router-dom';

export interface IMainNavProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    nodesTree: IMainNavigationNode[];
    isFulfilled: boolean;
    isTouch?: boolean;
    isMobileNavOpened: boolean;
    onMobileNavToggle: (isMobileNavOpened: boolean) => void;
    headerHeight: number;
}

export interface IMainNavState {
    selectedNode: IMainNavigationNode;
    openedNodes: IMainNavigationNode[];
}
