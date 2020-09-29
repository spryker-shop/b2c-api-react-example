import * as actionTypes from '@stores/actionTypes/pages/login';
import { PagesLoginService } from '@services/pages/Login';
import {
    ICustomerLoginData,
    ICustomerLoginDataParsed,
    ICustomerProfile, ILoginDataToLocalStorage,
    IResetPasswordPayload
} from '@interfaces/customer';
import { IPageLoginAction } from '@stores/reducers/pages/login/types';

export const registerPendingState = (): IPageLoginAction => ({
    type: actionTypes.PAGES_CUSTOMER_REGISTER + '_PENDING'
});

export const registerFulfilledState = (): IPageLoginAction => ({
    type: actionTypes.PAGES_CUSTOMER_REGISTER + '_FULFILLED'
});

export const registerRejectedState = (message: string): IPageLoginAction => ({
    type: actionTypes.PAGES_CUSTOMER_REGISTER + '_REJECTED',
    payloadRejected: { error: message }
});

export const customerRegisterAction = (payload: ICustomerProfile): Function =>
    (dispatch: Function, getState: Function): void => {
        PagesLoginService.register(dispatch, payload, getState);
    };

export const loginCustomerPendingStateAction = (): IPageLoginAction => ({
    type: actionTypes.PAGES_LOGIN_REQUEST + '_PENDING'
});

export const loginCustomerRejectedStateAction = (message: string): IPageLoginAction => ({
    type: actionTypes.PAGES_LOGIN_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const loginCustomerFulfilledStateAction = (payload: ICustomerLoginDataParsed): IPageLoginAction => ({
    type: actionTypes.PAGES_LOGIN_REQUEST + '_FULFILLED',
    payloadProfileDataFulfilled: payload
});

export const loginCustomerAction = (payload: ICustomerLoginData, anonymId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        PagesLoginService.loginRequest(dispatch, payload, anonymId);
    };

export const forgotPasswordPendingState = (): IPageLoginAction => ({
    type: actionTypes.FORGOT_PASSWORD + '_PENDING'
});

export const forgotPasswordRejectedState = (message: string): IPageLoginAction => ({
    type: actionTypes.FORGOT_PASSWORD + '_REJECTED',
    payloadRejected: { error: message }
});

export const forgotPasswordFulfilledState = (): IPageLoginAction => ({
    type: actionTypes.FORGOT_PASSWORD + '_FULFILLED'
});

export const forgotPasswordAction = (email: string) => (dispatch: Function, getState: Function): void => {
    PagesLoginService.forgotPassword(dispatch, email);
};

export const resetPasswordPendingState = (): IPageLoginAction => ({
    type: actionTypes.RESET_PASSWORD + '_PENDING'
});

export const resetPasswordRejectedState = (message: string): IPageLoginAction => ({
    type: actionTypes.RESET_PASSWORD + '_REJECTED',
    payloadRejected: { error: message }
});

export const resetPasswordFulfilledState = (): IPageLoginAction => ({
    type: actionTypes.RESET_PASSWORD + '_FULFILLED'
});

export const resetPasswordAction = (payload: IResetPasswordPayload): Function =>
    (dispatch: Function, getState: Function) => {
        PagesLoginService.resetPassword(dispatch, payload);
    };

export const logoutFulfilledState = (): IPageLoginAction => ({
    type: actionTypes.PAGES_CUSTOMER_LOGOUT
});

export const logoutAction = (): Function => (dispatch: Function, getState: Function): void => {
    PagesLoginService.logout(dispatch);
};

export const saveLoginDataToStoreAction = (payload: ILoginDataToLocalStorage): IPageLoginAction => ({
    type: actionTypes.LOGIN_DATA_SET_TO_STORE + '_FULFILLED',
    payloadStoreFulfilled: payload
});

export const refreshTokenPendingState = (): IPageLoginAction => ({
    type: actionTypes.REFRESH_TOKEN_REQUEST + '_PENDING'
});

export const refreshTokenRejectedState = (message: string): IPageLoginAction => ({
    type: actionTypes.REFRESH_TOKEN_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const refreshTokenFulfilledState = (customerData: ICustomerLoginDataParsed): IPageLoginAction => ({
    type: actionTypes.REFRESH_TOKEN_REQUEST + '_FULFILLED',
    payloadProfileDataFulfilled: customerData
});
