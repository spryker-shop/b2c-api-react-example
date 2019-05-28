import * as actionTypes from '@stores/actionTypes/pages/login';
import * as loginHandlers  from '@stores/reducers/pages/login/handlers';
import { SET_AUTH_FROM_STORAGE } from '@stores/actionTypes/common/init';
import { ILoginState, IPageLoginAction } from '@stores/reducers/pages/login/types';

export const initialState: ILoginState = {
    data: {
        customerRef: '',
        isAuth: false,
        tokenType: '',
        expiresIn: 0,
        accessToken: '',
        refreshToken: '',
        customerUsername: ''
    }
};

export const pagesLogin = (state: ILoginState = initialState, action: IPageLoginAction): ILoginState => {
    switch (action.type) {
        case `${actionTypes.PAGES_LOGIN_REQUEST}_PENDING`:
        case `${actionTypes.FORGOT_PASSWORD}_PENDING`:
        case `${actionTypes.RESET_PASSWORD}_PENDING`:
        case `${actionTypes.PAGES_CUSTOMER_REGISTER}_PENDING`:
        case `${actionTypes.REFRESH_TOKEN_REQUEST}_PENDING`:
            return loginHandlers.handlePending(state);
        case `${actionTypes.FORGOT_PASSWORD}_FULFILLED`:
        case `${actionTypes.RESET_PASSWORD}_FULFILLED`:
        case `${actionTypes.PAGES_CUSTOMER_REGISTER}_FULFILLED`:
            return loginHandlers.handleFulfilled(state);
        case `${actionTypes.PAGES_CUSTOMER_REGISTER}_REJECTED`:
        case `${actionTypes.PAGES_LOGIN_REQUEST}_REJECTED`:
        case `${actionTypes.REFRESH_TOKEN_REQUEST}_REJECTED`:
        case `${actionTypes.FORGOT_PASSWORD}_REJECTED`:
        case `${actionTypes.RESET_PASSWORD}_REJECTED`:
            return loginHandlers.handleRejected(state, action.payloadRejected);
        case `${actionTypes.PAGES_LOGIN_REQUEST}_FULFILLED`:
        case `${actionTypes.REFRESH_TOKEN_REQUEST}_FULFILLED`:
            return loginHandlers.handleAuthenticationFulfilled(state, action.payloadProfileDataFulfilled);
        case `${actionTypes.LOGIN_DATA_SET_TO_STORE}_FULFILLED`:
            return loginHandlers.handleLoginDataSetToStoreFilfilled(state, action.payloadStoreFulfilled.email);
        case `${SET_AUTH_FROM_STORAGE}_FULFILLED`:
            return loginHandlers.handleAuthenticationFulfilled(state, action.payloadAuthFulfilled);
        case actionTypes.PAGES_CUSTOMER_LOGOUT:
            return initialState;
        default:
            return state;
    }
};
