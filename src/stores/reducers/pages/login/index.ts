import {
    FORGOT_PASSWORD,
    PAGES_CUSTOMER_LOGOUT,
    PAGES_CUSTOMER_REGISTER,
    PAGES_LOGIN_REQUEST,
    REFRESH_TOKEN_REQUEST,
    RESET_PASSWORD,
    LOGIN_DATA_SET_TO_STORE
} from '@stores/actionTypes/pages/login';
import { SET_AUTH_FROM_STORAGE } from '@stores/actionTypes/common/init';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ILoginState, IPageLoginAction } from '@stores/reducers/pages/login/types';

export const initialState: ILoginState = {
    data: {
        customerRef: '',
        isAuth: false,
        tokenType: '',
        expiresIn: 0,
        accessToken: '',
        refreshToken: '',
        customerUsername: '',
    },
};

export const pagesLogin = function (state: ILoginState = initialState, action: IPageLoginAction): ILoginState {
    switch (action.type) {
        case `${PAGES_CUSTOMER_REGISTER}_PENDING`:
        case `${REFRESH_TOKEN_REQUEST}_PENDING`:
            return {
                ...state,
                ...getReducerPartPending(),
            };
        case `${PAGES_CUSTOMER_REGISTER}_FULFILLED`:
            return {
                ...state,
                ...getReducerPartFulfilled(),
            };
        case `${PAGES_CUSTOMER_REGISTER}_REJECTED`:
        case `${PAGES_LOGIN_REQUEST}_REJECTED`:
        case `${REFRESH_TOKEN_REQUEST}_REJECTED`:
        case `${FORGOT_PASSWORD}_REJECTED`:
        case `${RESET_PASSWORD}_REJECTED`:
            return {
                ...state,
                ...getReducerPartRejected(action.payloadRejected.error),
            };
        case `${PAGES_LOGIN_REQUEST}_PENDING`:
        case `${FORGOT_PASSWORD}_PENDING`:
        case `${RESET_PASSWORD}_PENDING`:
            return {
                ...state,
                ...getReducerPartPending(),
            };
        case `${PAGES_LOGIN_REQUEST}_FULFILLED`:
        case `${REFRESH_TOKEN_REQUEST}_FULFILLED`:
            return {
                ...state,
                data: {
                    ...state.data,
                    isAuth: true,
                    ...action.payloadProfileDataFulfilled,
                },
                ...getReducerPartFulfilled(),
            };
        case `${LOGIN_DATA_SET_TO_STORE}_FULFILLED`:
            const customerUsername = action.payloadStoreFulfilled.email ? action.payloadStoreFulfilled.email : null;

            return {
                ...state,
                data: {
                    ...state.data,
                    customerUsername,
                },
            };
        case `${SET_AUTH_FROM_STORAGE}_FULFILLED`:
            return {
                ...state,
                data: {
                    ...state.data,
                    isAuth: true,
                    ...action.payloadAuthFulfilled,
                },
            };
        case PAGES_CUSTOMER_LOGOUT:
            localStorage.clear();

            return {
                ...state,
                data: initialState.data,
            };
        case `${FORGOT_PASSWORD}_FULFILLED`:
        case `${RESET_PASSWORD}_FULFILLED`:
            return {
                ...state,
                ...getReducerPartFulfilled(),
            };
        default:
            return state;
    }
};

// selectors

export function isUserAuthenticated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.pagesLogin && state.pagesLogin.data && state.pagesLogin.data.isAuth);
}

export function getAccessToken(state: IReduxStore, props: IReduxOwnProps): string | null {
    return (
        isUserAuthenticated(state, props) && state.pagesLogin.data.accessToken
            ? state.pagesLogin.data.accessToken
            : null
    );
}

export function getCustomerReference(state: IReduxStore, props: IReduxOwnProps): string | null {
    return (
        isUserAuthenticated(state, props) && state.pagesLogin.data.customerRef
            ? state.pagesLogin.data.customerRef
            : null
    );
}

export function getCustomerUsername(state: IReduxStore, props: IReduxOwnProps): string | null {

    if (!isStateExist(state, props) || !isUserAuthenticated(state, props)) {
        return null;
    } else {
        if (state.pagesLogin.data && state.pagesLogin.data.customerUsername) {
            return state.pagesLogin.data.customerUsername;
        } else {
            const customerUsername = localStorage.getItem('customerUsername');
            if (!customerUsername) {
                return null;
            }

            return customerUsername;
        }
    }
}

export function isPageLoginStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.pagesLogin && state.pagesLogin.pending && state.pagesLogin.pending === true);
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pagesLogin.data);
}
