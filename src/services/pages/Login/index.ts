import api from '@services/api';
import { saveLoginDataToStoreAction, deleteCustomerFulfilledStateAction } from '@stores/actions/pages/customerProfile';
import { parseLoginDataResponse } from '@helpers/customer';
import {
    loginCustomerFulfilledStateAction,
    loginCustomerPendingStateAction,
    loginCustomerRejectedStateAction,
    logoutAction,
    registerPendingState,
    registerFulfilledState,
    registerRejectedState,
    forgotPasswordPendingState,
    forgotPasswordRejectedState,
    forgotPasswordFulfilledState,
    resetPasswordPendingState,
    resetPasswordRejectedState,
    resetPasswordFulfilledState
} from '@stores/actions/pages/login';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { ICustomerLoginData, ICustomerProfile, IResetPasswordPayload } from '@interfaces/customer';
import { saveAccessDataToLocalStorage } from '@helpers/localStorage';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError, typeNotificationWarning } from '@constants/notifications';
import { getAnonymId, clearAnonymId } from '@helpers/common';
import { anonymIdFilFilled } from '@stores/actions/common/init';
import { clearWishlistState } from '@stores/actions/pages/wishlist';

export class PagesLoginService extends ApiServiceAbstract {
    public static async register(dispatch: Function, payload: ICustomerProfile, getState: Function): Promise<void> {
        const anonymId: string = getState().init.data.anonymId;
        dispatch(registerPendingState());

        try {
            const body = {
                data: {
                    type: 'customers',
                    attributes: payload,
                },
            };
            const response: IApiResponseData = await api.post(
                'customers',
                body,
                {
                    withCredentials: true,
                    headers: {'X-Anonymous-Customer-Unique-Id': anonymId}
                });

            if (response.ok) {
                dispatch(registerFulfilledState());

                NotificationsMessage({
                    id: 'register.success.message',
                    type: typeNotificationSuccess
                });

                await PagesLoginService.loginRequest(dispatch, {
                    username: payload.email,
                    password: payload.password,
                }, anonymId);
                clearAnonymId();
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(registerRejectedState(errorMessage));

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
            dispatch(registerRejectedState(error.message));

            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async loginRequest(dispatch: Function, payload: ICustomerLoginData, anonymId: string): Promise<void> {
        try {
            dispatch(loginCustomerPendingStateAction());

            const body = {
                data: {
                    type: 'access-tokens',
                    attributes: payload,
                },
            };

            const response: IApiResponseData = await api.post(
                'access-tokens',
                body,
                {
                    withCredentials: true,
                    headers: {'X-Anonymous-Customer-Unique-Id': anonymId}
                }
            );

            if (response.ok) {
                const responseParsed = parseLoginDataResponse(response.data);
                dispatch(saveLoginDataToStoreAction({email: payload.username}));
                saveAccessDataToLocalStorage(responseParsed);
                dispatch(loginCustomerFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'customer.login.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(loginCustomerRejectedStateAction(errorMessage));
                NotificationsMessage({
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(loginCustomerRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async forgotPassword(dispatch: Function, email: string): Promise<void> {
        try {
            dispatch(forgotPasswordPendingState());

            const body = {
                data: {
                    type: 'customer-forgotten-password',
                    attributes: {email},
                },
            };

            const response: IApiResponseData = await api.post(
                'customer-forgotten-password',
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                dispatch(forgotPasswordFulfilledState());

                NotificationsMessage({
                    id: 'link.sanded.created.message',
                    type: typeNotificationSuccess
                });
            } else {
                dispatch(forgotPasswordRejectedState(response.problem));

                NotificationsMessage({
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(forgotPasswordRejectedState(error.message));

            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async resetPassword(dispatch: Function, payload: IResetPasswordPayload): Promise<void> {
        try {
            dispatch(resetPasswordPendingState());

            const body = {
                data: {
                    type: 'customer-restore-password',
                    attributes: payload,
                },
            };

            const response: IApiResponseData = await api.patch(
                'customer-restore-password',
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                dispatch(resetPasswordFulfilledState());

                NotificationsMessage({
                    id: 'password.successfull.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                dispatch(resetPasswordRejectedState(response.problem));

                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(resetPasswordRejectedState(error.message));

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
        dispatch(logoutAction());
        dispatch(deleteCustomerFulfilledStateAction());
        dispatch(clearWishlistState());
    }
}
