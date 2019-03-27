import { GET_MAIN_NAVIGATION } from '@stores/actionTypes/common/navigations';
import { NavigationService } from '@services/common/Navigations';
import { IMainNavigationNode } from '@interfaces/navigations';
import { INavigationsAction } from '@stores/reducers/common/navigations/types';

export const getMainNavigationPendingState = (): INavigationsAction => ({
    type: GET_MAIN_NAVIGATION + '_PENDING'
});

export const getMainNavigationRejectState = (message: string): INavigationsAction => ({
    type: GET_MAIN_NAVIGATION + '_REJECTED',
    payloadRejected: {error: message}
});

export const getMainNavigationFulfilledState = (payloadMainNavigation: IMainNavigationNode[]): INavigationsAction => ({
    type: GET_MAIN_NAVIGATION + '_FULFILLED',
    payloadMainNavigationFulfilled: payloadMainNavigation
});

export const getMainNavigationAction = (): Function => (
    (dispatch: Function) => NavigationService.getMainNavigation(dispatch)
);
