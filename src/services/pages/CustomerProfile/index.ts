import api, { setAuthToken } from '@services/api';
import * as CustomerProfileActions from '@stores/actions/pages/customerProfile';
import { ICustomerDataParsed, ICustomerProfileIdentity, ICustomerProfilePassword } from '@interfaces/customer';
import { parseCustomerDataResponse } from '@helpers/customer/customerDataResponse';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { CustomerProfileAuthenticateErrorMessage } from '@translation/';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { logout } from '@stores/actions/pages/login';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';

interface IRequestBody {
    data: {
        type: string;
        id?: string;
        include?: string;
        attributes: ICustomerProfileIdentity | ICustomerProfilePassword;
    };
}

export class CustomerProfileService extends ApiServiceAbstract {
    private static getCustomersEndpoint = (customerReference: string) => (
        `/customers/${customerReference}`
    );

    public static async getProfileData(dispatch: Function, customerReference: string): Promise<void> {
        try {
            dispatch(CustomerProfileActions.getCustomerProfilePendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(CustomerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.get(
                this.getCustomersEndpoint(customerReference),
                {include: ''},
                {withCredentials: true}
            );

            if (response.ok) {
                const responseParsed: ICustomerDataParsed | null = parseCustomerDataResponse(response.data);
                dispatch(CustomerProfileActions.getCustomerProfileFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.getCustomerProfileRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CustomerProfileActions.getCustomerProfileRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async updateProfileData(dispatch: Function,
                                          customerReference: string,
                                          payload: ICustomerProfileIdentity): Promise<void> {
        try {
            dispatch(CustomerProfileActions.updateCustomerProfilePendingStateAction());

            const body: IRequestBody = {
                data: {
                    type: 'customers',
                    id: customerReference,
                    attributes: payload,
                    include: ''
                }
            };

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(CustomerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.patch(
                this.getCustomersEndpoint(customerReference),
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                const responseParsed: ICustomerDataParsed = parseCustomerDataResponse(response.data);
                dispatch(CustomerProfileActions.updateCustomerProfileFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'profile.data.successfully.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.updateCustomerProfileRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CustomerProfileActions.updateCustomerProfileRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async updatePasswordData(
        dispatch: Function,
        customerReference: string,
        payload: ICustomerProfilePassword
    ): Promise<void> {
        try {
            dispatch(CustomerProfileActions.updateCustomerPasswordPendingStateAction());

            const body: IRequestBody = { data: { type: 'customer-password', attributes: payload } };

            const token: string = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(CustomerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.patch(`customer-password`, body, {withCredentials: true});

            if (response.ok) {
                dispatch(CustomerProfileActions.updateCustomerPasswordFulfilledStateAction());
                NotificationsMessage({
                    id: 'password.successfully.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.updateCustomerPasswordRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CustomerProfileActions.updateCustomerPasswordRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async deleteCustomerEntity(dispatch: Function, customerReference: string): Promise<void> {
        try {
            dispatch(CustomerProfileActions.deleteCustomerPendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(CustomerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const endpoint = `customers/${customerReference}`;
            const response: IApiResponseData = await api.delete(endpoint, null, {withCredentials: true});

            if (response.ok) {
                dispatch(logout());
                dispatch(CustomerProfileActions.deleteCustomerFulfilledStateAction());
                NotificationsMessage({
                    id: 'account.was.deleted.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.deleteCustomerRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CustomerProfileActions.deleteCustomerRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
