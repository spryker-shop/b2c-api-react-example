import * as actionTypes from '@stores/actionTypes/common/navigations';
import * as navigationHandlers  from './handlers';
import { INavigationsAction, INavigationsState } from './types';

export const initialState: INavigationsState = {
    mainNavigation: {
        nodesTree: []
    }
};

export const navigations = (state: INavigationsState = initialState, action: INavigationsAction): INavigationsState => {
    switch (action.type) {
        case `${actionTypes.GET_MAIN_NAVIGATION}_PENDING`:
            return navigationHandlers.handleMainNavigationPending(state);
        case `${actionTypes.GET_MAIN_NAVIGATION}_FULFILLED`:
            return navigationHandlers.handleMainNavigationFulfilled(state, action.payloadMainNavigationFulfilled);
        case `${actionTypes.GET_MAIN_NAVIGATION}_REJECTED`:
            return navigationHandlers.handleMainNavigationRejected(state, action.payloadRejected);
        default:
            return state;
    }
};
