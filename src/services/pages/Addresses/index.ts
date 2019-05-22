import { IAddressIndexSignture, IAddressItem } from '@interfaces/addresses';
import { RefreshTokenService } from '@services/common/RefreshToken';
import api, { setAuthToken } from '@services/api';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from '@services/types';
import {
    IAddressDataRawResponse,
    IRequestAddAddressBody,
    IRequestUpdateAddressBody
} from '@services/pages/Addresses/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import {
    typeNotificationSuccess,
    typeNotificationError
} from '@constants/notifications';
import { ADD_ADDRESS, MULTIPLE_ADDRESSES } from '@stores/actionTypes/pages/addresses';

export class AddressesService extends ApiServiceAbstract {
    public static async getCustomerAddresses(
        ACTION_TYPE: string,
        dispatch: Function,
        customerId: string
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `customers/${ customerId }/addresses`;
            const response: IApiResponseData = await api.get(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                const addresses = response.data.data.map((
                    address: IAddressDataRawResponse
                ): IAddressItem => ({ id: address.id, ...address.attributes }));

                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    addresses
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    error: errorMessage
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error: error.message
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getOneCustomerAddress(ACTION_TYPE: string,
                                              dispatch: Function,
                                              customerId: string,
                                              addressId: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `customers/${ customerId }/addresses/${ addressId }`;
            const response: IApiResponseData = await api.get(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                const { data: { attributes, id } } = response.data;

                const address: IAddressItem = Object.keys(attributes).reduce((acc: IAddressIndexSignture, current) => {
                    acc[current] = attributes[current];

                    return acc;
                }, {});
                address.id = id;

                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadFulfilled: { data: address, addressId: id }
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    error: errorMessage
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }
        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error: error.message
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async addAddress(
        ACTION_TYPE: string,
        dispatch: Function,
        payload: IAddressItem,
        customerId: string
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestAddAddressBody = {
                data: {
                    type: 'addresses',
                    attributes: payload
                }
            };

            const endpoint = `customers/${ customerId }/addresses`;
            const response: IApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    address: { id: response.data.data.id, ...response.data.data.attributes }

                });
                NotificationsMessage({
                    id: 'new.address.added.message',
                    type: typeNotificationSuccess
                });

                await AddressesService.getCustomerAddresses('ADDRESSES_LIST', dispatch, customerId);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    error: errorMessage
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async deleteAddress(ACTION_TYPE: string,
                                      dispatch: Function,
                                      addressId: string,
                                      customerId: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: IApiResponseData = await api.delete(
                `customers/${ customerId }/addresses/${ addressId }`, {}, { withCredentials: true }
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'address.removed.message',
                    type: typeNotificationSuccess
                });
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    addressId
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    error: errorMessage
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async updateAddress(ACTION_TYPE: string,
                                      dispatch: Function,
                                      addressId: string,
                                      customerId: string,
                                      payload: IAddressItem): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestUpdateAddressBody = {
                data: {
                    type: 'addresses',
                    id: addressId,
                    attributes: payload
                }
            };

            const response: IApiResponseData = await api.patch(
                `customers/${ customerId }/addresses/${ addressId }`, body, { withCredentials: true }
            );

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadFulfilled: {
                        addressId,
                        data: response.data.data.attributes
                    }
                });
                NotificationsMessage({
                    id: 'address.updated.message',
                    type: typeNotificationSuccess
                });

                await AddressesService.getCustomerAddresses('ADDRESSES_LIST', dispatch, customerId);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    error: errorMessage
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async addMultipleAddressAction(ACTION_TYPE: string,
                                                 dispatch: Function,
                                                 payload: IAddressItem,
                                                 customerId: string,
                                                 billing: IAddressItem): Promise<void> {
        await AddressesService.addAddress(ADD_ADDRESS, dispatch, payload, customerId);

        if (Boolean(billing)) {
            await AddressesService.addAddress(ADD_ADDRESS, dispatch, billing, customerId);
        }
        dispatch({ type: MULTIPLE_ADDRESSES + '_FULFILLED' });
    }
}
