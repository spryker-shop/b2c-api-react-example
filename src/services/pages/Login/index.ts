import api from '@services/api';
import { saveLoginDataToStoreAction } from '@stores/actions/pages/customerProfile';
import { parseLoginDataResponse } from '@helpers/customer';
import {
    loginCustomerFulfilledStateAction,
    loginCustomerPendingStateAction,
    loginCustomerRejectedStateAction,
} from '@stores/actions/pages/login';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { ICustomerLoginData, ICustomerProfile, IResetPasswordPayload } from '@interfaces/customer';
import { saveAccessDataToLocalStorage, saveCustomerUsernameToLocalStorage } from '@helpers/localStorage';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import {
    typeNotificationSuccess,
    typeNotificationError,
    typeNotificationWarning
} from '@constants/notifications';

export class PagesLoginService extends ApiServiceAbstract {
    public static async register(ACTION_TYPE: string, dispatch: Function, payload: ICustomerProfile): Promise<void> {
        try {
            const body = {
                data: {
                    type: 'customers',
                    attributes: payload,
                },
            };
            const response: IApiResponseData = await api.post('customers', body, {withCredentials: true});

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });

                NotificationsMessage({
                    id: 'register.success.message',
                    type: typeNotificationSuccess
                });

                await PagesLoginService.loginRequest(dispatch, {
                    username: payload.email,
                    password: payload.password,
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });

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
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async loginRequest(dispatch: Function, payload: ICustomerLoginData): Promise<void> {
        try {
            dispatch(loginCustomerPendingStateAction());

            const body = {
                data: {
                    type: 'access-tokens',
                    attributes: payload,
                },
            };

            const response: IApiResponseData = await api.post('access-tokens', body, {withCredentials: true});

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

    public static async forgotPassword(ACTION_TYPE: string, dispatch: Function, email: string): Promise<void> {
        try {
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
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });
                NotificationsMessage({
                    id: 'link.sanded.created.message',
                    type: typeNotificationSuccess
                });
            } else {
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: response.problem},
                });
                NotificationsMessage({
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async resetPassword(
        ACTION_TYPE: string,
        dispatch: Function,
        payload: IResetPasswordPayload
    ): Promise<void> {
        try {
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
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                });
                NotificationsMessage({
                    id: 'password.successfull.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: response.problem},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: response.problem,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
