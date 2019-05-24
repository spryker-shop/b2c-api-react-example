import * as CustomerProfileActions from '@stores/actions/pages/customerProfile';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { ICustomerDataParsed, ICustomerProfileIdentity, ICustomerProfilePassword } from '@interfaces/customer';
import { parseCustomerDataResponse } from '@helpers/parsing';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { customerProfileAuthenticateErrorMessage } from '@translation/';
import { logoutAction } from '@stores/actions/pages/login';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { IRequestBody } from '@services/pages/CustomerProfile/types';
import { errorMessageInform } from '@helpers/common';

export class CustomerProfileService extends ApiServiceAbstract {
    private static getCustomersEndpoint = (customerReference: string) => `/customers/${ customerReference }`;

    public static async getProfileData(dispatch: Function, customerReference: string): Promise<void> {
        dispatch(CustomerProfileActions.getCustomerProfilePendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(customerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.get(
                this.getCustomersEndpoint(customerReference),
                { include: '' },
                { withCredentials: true }
            );

            if (response.ok) {
                const responseParsed: ICustomerDataParsed | null = parseCustomerDataResponse(response.data);
                dispatch(CustomerProfileActions.getCustomerProfileFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.getCustomerProfileRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CustomerProfileActions.getCustomerProfileRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async updateProfileData(
        dispatch: Function,
        customerReference: string,
        payload: ICustomerProfileIdentity
    ): Promise<void> {
        dispatch(CustomerProfileActions.updateCustomerProfilePendingStateAction());
        try {
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
                Promise.reject(customerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.patch(
                this.getCustomersEndpoint(customerReference),
                body,
                { withCredentials: true }
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
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CustomerProfileActions.updateCustomerProfileRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async updatePasswordData(
        dispatch: Function,
        customerReference: string,
        payload: ICustomerProfilePassword
    ): Promise<void> {
        dispatch(CustomerProfileActions.updateCustomerPasswordPendingStateAction());
        try {
            const body: IRequestBody = { data: { type: 'customer-password', attributes: payload } };

            const token: string = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(customerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.patch(`customer-password`, body, { withCredentials: true });

            if (response.ok) {
                dispatch(CustomerProfileActions.updateCustomerPasswordFulfilledStateAction());
                NotificationsMessage({
                    id: 'password.successfully.updated.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.updateCustomerPasswordRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CustomerProfileActions.updateCustomerPasswordRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async deleteCustomerEntity(dispatch: Function, customerReference: string): Promise<void> {
        dispatch(CustomerProfileActions.deleteCustomerPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(customerProfileAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const endpoint = `customers/${ customerReference }`;
            const response: TApiResponseData = await api.delete(endpoint, null, { withCredentials: true });

            if (response.ok) {
                dispatch(logoutAction());
                dispatch(CustomerProfileActions.deleteCustomerFulfilledStateAction());
                NotificationsMessage({
                    id: 'account.was.deleted.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CustomerProfileActions.deleteCustomerRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CustomerProfileActions.deleteCustomerRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
