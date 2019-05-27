import { INavigationsState } from '@stores/reducers/common/navigations/types';
import { IMainNavigationNode } from '@interfaces/navigations';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';

export const handleMainNavigationFulfilled = (
    state: INavigationsState,
    payload: IMainNavigationNode[]
): INavigationsState => ({
    ...state,
    mainNavigation: {
        ...state.mainNavigation,
        nodesTree: payload,
        ...getReducerPartFulfilled(),
    },
});

export const handleMainNavigationRejected = (
    state: INavigationsState,
    payload: IApiErrorResponse
): INavigationsState => ({
    ...state,
    mainNavigation: {
        ...state.mainNavigation,
        ...getReducerPartRejected(payload.error),
    }
});

export const handleMainNavigationPending = (state: INavigationsState): INavigationsState => ({
    ...state,
    mainNavigation: {
        ...state.mainNavigation,
        ...getReducerPartPending(),
    },
});
