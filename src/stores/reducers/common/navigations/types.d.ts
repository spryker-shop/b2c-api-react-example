import { IActionData, IReduxState } from '@stores/reducers/types';
import { IMainNavigationNode } from '@interfaces/navigations';

export interface INavigationsState {
    mainNavigation: IReduxState & {
        nodesTree: IMainNavigationNode[];
    };
}

export interface INavigationsAction extends IActionData {
    payloadMainNavigationFulfilled?: IMainNavigationNode[];
}
