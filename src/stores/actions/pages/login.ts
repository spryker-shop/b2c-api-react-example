import {
    FORGOT_PASSWORD,
    PAGES_CUSTOMER_LOGOUT,
    PAGES_CUSTOMER_REGISTER,
    PAGES_LOGIN_REQUEST,
    RESET_PASSWORD
} from '@stores/actionTypes/pages/login';
import { PagesLoginService } from '@services/pages/Login';
import {
    ICustomerLoginData,
    ICustomerLoginDataParsed,
    ICustomerProfile,
    IResetPasswordPayload
} from '@interfaces/customer';

export const registerPendingState = () => ({
    type: PAGES_CUSTOMER_REGISTER + '_PENDING'
});

export const customerRegisterAction = function (payload: ICustomerProfile) {
    return (dispatch: Function, getState: Function) => {
        const anonymId: string = getState().init.data.anonymId;

        dispatch(registerPendingState);
        PagesLoginService.register(PAGES_CUSTOMER_REGISTER, dispatch, payload, anonymId);
    };
};

export const logoutAction = function () {
    return { type: PAGES_CUSTOMER_LOGOUT };
};

export const logout = function () {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.logout(dispatch);
    };
};

// Login Customer Entity
export const loginCustomerPendingStateAction = () => ({
    type: PAGES_LOGIN_REQUEST + '_PENDING'
});

export const loginCustomerRejectedStateAction = (message: string) => ({
    type: PAGES_LOGIN_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const loginCustomerFulfilledStateAction = (payload: ICustomerLoginDataParsed) => ({
    type: PAGES_LOGIN_REQUEST + '_FULFILLED',
    payloadProfileDataFulfilled: payload
});

export const loginCustomerAction = function (payload: ICustomerLoginData) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.loginRequest(dispatch, payload, '');
    };
};

export const forgotPasswordAction = function (email: string) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.forgotPassword(FORGOT_PASSWORD, dispatch, email);
    };
};

export const resetPasswordAction = function (payload: IResetPasswordPayload) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.resetPassword(RESET_PASSWORD, dispatch, payload);
    };
};
