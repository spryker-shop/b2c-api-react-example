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

export const registerFulfilledState = () => ({
    type: PAGES_CUSTOMER_REGISTER + '_FULFILLED'
});

export const registerRejectedState = (message: string) => ({
    type: PAGES_CUSTOMER_REGISTER + '_REJECTED',
    payloadRejected: { error: message }
});

export const customerRegisterAction = function (payload: ICustomerProfile) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.register(dispatch, payload, getState);
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

export const forgotPasswordPendingState = () => ({
    type: FORGOT_PASSWORD + '_PENDING'
});

export const forgotPasswordRejectedState = (message: string) => ({
    type: FORGOT_PASSWORD + '_REJECTED',
    payloadRejected: { error: message }
});

export const forgotPasswordFulfilledState = () => ({
    type: FORGOT_PASSWORD + '_FULFILLED'
});

export const forgotPasswordAction = function (email: string) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.forgotPassword(dispatch, email);
    };
};

export const resetPasswordPendingState = () => ({
    type: RESET_PASSWORD + '_PENDING'
});

export const resetPasswordRejectedState = (message: string) => ({
    type: RESET_PASSWORD + '_REJECTED',
    payloadRejected: { error: message }
});

export const resetPasswordFulfilledState = () => ({
    type: RESET_PASSWORD + '_FULFILLED'
});

export const resetPasswordAction = function (payload: IResetPasswordPayload) {
    return (dispatch: Function, getState: Function) => {
        PagesLoginService.resetPassword(dispatch, payload);
    };
};
