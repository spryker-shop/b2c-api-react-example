import { GET_MAIN_NAVIGATION } from '@stores/actionTypes/common/navigations';
import { INavigationsAction, INavigationsState } from './types';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { IMainNavigationNode } from '@interfaces/navigations';

export const initialState: INavigationsState = {
    mainNavigation: {
        nodesTree: []
    }
};

export const navigations = (state: INavigationsState = initialState, action: INavigationsAction): INavigationsState => {
    switch (action.type) {
        case `${GET_MAIN_NAVIGATION}_PENDING`:
            return handleMainNavigationPending(state);
        case `${GET_MAIN_NAVIGATION}_FULFILLED`:
            return handleMainNavigationFulfilled(state, action.payloadMainNavigationFulfilled);
        case `${GET_MAIN_NAVIGATION}_REJECTED`:
            return handleMainNavigationRejected(state, action.payloadRejected || {error: action.error});
        default:
            return state;
    }
};

const handleMainNavigationFulfilled = (navigationsState: INavigationsState, payload: IMainNavigationNode[]) =>
    ({
        ...navigationsState,
        mainNavigation: {
            ...navigationsState.mainNavigation,
            nodesTree: payload,
            ...getReducerPartFulfilled(),
        },
    });

const handleMainNavigationRejected = (navigationsState: INavigationsState, payload: IApiErrorResponse) =>
    ({
        ...navigationsState,
        mainNavigation: {
            ...navigationsState.mainNavigation,
            ...getReducerPartRejected(payload.error),
        }
    });

const handleMainNavigationPending = (navigationsState: INavigationsState) =>
    ({
        ...navigationsState,
        mainNavigation: {
            ...navigationsState.mainNavigation,
            ...getReducerPartPending(),
        },
    });
