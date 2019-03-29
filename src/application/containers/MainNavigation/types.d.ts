import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IMainNavigationNode } from '@interfaces/navigations';
import { WithRouter } from '@interfaces/common';

export interface IMainNavProps extends WithStyles<typeof styles>, WithRouter {
    nodesTree: IMainNavigationNode[];
    isFulfilled: boolean;
    isTouch?: boolean;
    isMobileNavOpened: boolean;
    onMobileNavToggle(): void;
}

export interface IMainNavState {
    isOpen: boolean;
    selectedNode: IMainNavigationNode | null;
    openedNodes: IMainNavigationNode[];
}
