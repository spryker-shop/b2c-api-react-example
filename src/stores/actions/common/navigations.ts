import * as actionTypes from '@stores/actionTypes/common/navigations';
import { IMainNavigationNode } from '@interfaces/navigations';
import { INavigationsAction } from '@stores/reducers/common/navigations/types';

export const getMainNavigationPendingState = (): INavigationsAction => ({
    type: actionTypes.GET_MAIN_NAVIGATION + '_PENDING'
});

export const getMainNavigationRejectState = (message: string): INavigationsAction => ({
    type: actionTypes.GET_MAIN_NAVIGATION + '_REJECTED',
    payloadRejected: {error: message}
});

export const getMainNavigationFulfilledState = (payloadMainNavigation: IMainNavigationNode[]): INavigationsAction => ({
    type: actionTypes.GET_MAIN_NAVIGATION + '_FULFILLED',
    payloadMainNavigationFulfilled: payloadMainNavigation
});
