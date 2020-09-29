import { IActionData, IReduxState } from '@stores/reducers/types';
import { IMainNavigationNode } from '@interfaces/navigations';

export interface IMainNavigation extends IReduxState {
    nodesTree: IMainNavigationNode[];
}

export interface INavigationsState {
    mainNavigation: IMainNavigation;
}

export interface INavigationsAction extends IActionData {
    payloadMainNavigationFulfilled?: IMainNavigationNode[];
}
