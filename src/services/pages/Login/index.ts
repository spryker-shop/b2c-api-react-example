import { api, ApiServiceAbstract } from '@services/api';
import { saveLoginDataToStoreAction, deleteCustomerFulfilledStateAction } from '@stores/actions/pages/customerProfile';
import { parseLoginDataResponse } from '@helpers/parsing';
import * as loginActions  from '@stores/actions/pages/login';
import { ICustomerLoginData, ICustomerProfile, IResetPasswordPayload } from '@interfaces/customer';
import { saveAccessDataToLocalStorage } from '@helpers/localStorage';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError, typeNotificationWarning } from '@constants/notifications';
import { getAnonymId, clearAnonymId } from '@helpers/common';
import { anonymIdFilFilled } from '@stores/actions/common/init';
import { clearWishlistState } from '@stores/actions/pages/wishlist';

export class PagesLoginService extends ApiServiceAbstract {
    public static async register(dispatch: Function, payload: ICustomerProfile, getState: Function): Promise<void> {
        const anonymId: string = getState().init.data.anonymId;
        dispatch(loginActions.registerPendingState());

        try {
            const body = { data: { type: 'customers', attributes: payload } };
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

                await PagesLoginService.loginRequest(dispatch, {
                    username: payload.email,
                    password: payload.password
                }, anonymId);
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
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async loginRequest(dispatch: Function, payload: ICustomerLoginData, anonymId: string): Promise<void> {
        try {
            dispatch(loginActions.loginCustomerPendingStateAction());

            const body = { data: { type: 'access-tokens', attributes: payload } };
            const response: TApiResponseData = await api.post(
                'access-tokens',
                body,
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                const responseParsed = parseLoginDataResponse(response.data);
                dispatch(saveLoginDataToStoreAction({ email: payload.username }));
                saveAccessDataToLocalStorage(responseParsed);
                dispatch(loginActions.loginCustomerFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'customer.login.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginActions.loginCustomerRejectedStateAction(errorMessage));
                NotificationsMessage({
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(loginActions.loginCustomerRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async forgotPassword(dispatch: Function, email: string): Promise<void> {
        try {
            dispatch(loginActions.forgotPasswordPendingState());

            const body = { data: { type: 'customer-forgotten-password', attributes: { email } } };
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
                dispatch(loginActions.forgotPasswordRejectedState(response.problem));
                NotificationsMessage({
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(loginActions.forgotPasswordRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async resetPassword(dispatch: Function, payload: IResetPasswordPayload): Promise<void> {
        try {
            dispatch(loginActions.resetPasswordPendingState());

            const body = { data: { type: 'customer-restore-password', attributes: payload } };
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
                dispatch(loginActions.resetPasswordRejectedState(response.problem));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(loginActions.resetPasswordRejectedState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static logout(dispatch: Function): void {
        const anonymId = getAnonymId();

        dispatch(anonymIdFilFilled(anonymId));
        dispatch(loginActions.logoutAction());
        dispatch(deleteCustomerFulfilledStateAction());
        dispatch(clearWishlistState());
    }
}
