import * as loginActions from '@stores/actions/pages/login';
import { IRequestBody } from '@services/pages/Login/types';
import { api, ApiServiceAbstract } from '@services/api';
import { deleteCustomerFulfilledStateAction } from '@stores/actions/pages/customerProfile';
import { parseLoginDataResponse } from '@helpers/parsing';
import { ICustomerLoginData, ICustomerProfile, IResetPasswordPayload } from '@interfaces/customer';
import { saveAccessDataToLocalStorage } from '@helpers/localStorage';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError, typeNotificationWarning } from '@constants/notifications';
import { getAnonymId, clearAnonymId, errorMessageInform } from '@helpers/common';
import { anonymIdFilFilled } from '@stores/actions/common/init';
import { clearWishlistState } from '@stores/actions/pages/wishlist';

export class PagesLoginService extends ApiServiceAbstract {
    public static async register(dispatch: Function, payload: ICustomerProfile, getState: Function): Promise<void> {
        const anonymId: string = getState().init.data.anonymId;
        dispatch(loginActions.registerPendingState());
        try {
            const body: IRequestBody = { data: { type: 'customers', attributes: payload } };
            const response: TApiResponseData = await api.post(
                'customers',
                body,
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                dispatch(loginActions.registerFulfilledState());
                NotificationsMessage({
                    id: 'register.success.message',
                    type: typeNotificationSuccess
                });

                await PagesLoginService.loginRequest(
                    dispatch,
                    { username: payload.email, password: payload.password },
                    anonymId
                );
                clearAnonymId();
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginActions.registerRejectedState(errorMessage));

                if (response.status === 422) {
                    NotificationsMessage({
                        message: errorMessage,
                        type: typeNotificationWarning
                    });
                } else {
                    NotificationsMessage({
                        message: errorMessage,
                        type: typeNotificationError
                    });
                }
            }

        } catch (error) {
            dispatch(loginActions.registerRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async loginRequest(dispatch: Function, payload: ICustomerLoginData, anonymId: string): Promise<void> {
        dispatch(loginActions.loginCustomerPendingStateAction());
        try {
            const body: IRequestBody = { data: { type: 'access-tokens', attributes: payload } };
            const response: TApiResponseData = await api.post(
                'access-tokens',
                body,
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                const responseParsed = parseLoginDataResponse(response.data);
                dispatch(loginActions.saveLoginDataToStoreAction({ email: payload.username }));
                saveAccessDataToLocalStorage(responseParsed);
                dispatch(loginActions.loginCustomerFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'customer.login.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginActions.loginCustomerRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(loginActions.loginCustomerRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async forgotPassword(dispatch: Function, email: string): Promise<void> {
        dispatch(loginActions.forgotPasswordPendingState());
        try {
            const body: IRequestBody = { data: { type: 'customer-forgotten-password', attributes: { email } } };
            const response: TApiResponseData = await api.post(
                'customer-forgotten-password',
                body,
                { withCredentials: true }
            );

            if (response.ok) {
                dispatch(loginActions.forgotPasswordFulfilledState());
                NotificationsMessage({
                    id: 'link.sanded.created.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginActions.forgotPasswordRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(loginActions.forgotPasswordRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async resetPassword(dispatch: Function, payload: IResetPasswordPayload): Promise<void> {
        dispatch(loginActions.resetPasswordPendingState());
        try {
            const body: IRequestBody = { data: { type: 'customer-restore-password', attributes: payload } };
            const response: TApiResponseData = await api.patch(
                'customer-restore-password',
                body,
                { withCredentials: true }
            );

            if (response.ok) {
                dispatch(loginActions.resetPasswordFulfilledState());
                NotificationsMessage({
                    id: 'password.successfull.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginActions.resetPasswordRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(loginActions.resetPasswordRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static logout(dispatch: Function): void {
        const anonymId = getAnonymId();

        dispatch(anonymIdFilFilled(anonymId));
        dispatch(loginActions.logoutFulfilledState());
        dispatch(deleteCustomerFulfilledStateAction());
        dispatch(clearWishlistState());
    }
}
