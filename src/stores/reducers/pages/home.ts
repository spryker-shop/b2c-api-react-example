import { PAGES_HOME_GET_DATA_REQUEST } from '@stores/actionTypes/pages/home';
import { IReduxState } from '@stores/reducers/types';

export interface IHomeState extends IReduxState {
    data: {
        items?: any[],
        items_count?: number,
    };
}

export const initialState: IHomeState = {
    data: {},
};

export const pagesHome = function (state: IHomeState = initialState, action: any): IHomeState {
    switch (action.type) {
        case `${PAGES_HOME_GET_DATA_REQUEST}_PENDING`:
            return {
                // ...state,
                error: null,
                data: {},
                pending: true,
                fulfilled: false,
                rejected: false,
            };
        case `${PAGES_HOME_GET_DATA_REQUEST}_FULFILLED`:
            return {
                // ...state,
                error: null,
                data: action.payload,
                pending: false,
                fulfilled: true,
                rejected: false,
            };
        case `${PAGES_HOME_GET_DATA_REQUEST}_REJECTED`:
            return {
                // ...state,
                error: action.error,
                data: {},
                pending: false,
                fulfilled: false,
                rejected: true,
            };
        default:
            return state;
    }
};

export function isPageHomeStateLoading(state: any, props: any): boolean {
    return (state.pagesHome && state.pagesHome.pending && state.pagesHome.pending === true);
}
