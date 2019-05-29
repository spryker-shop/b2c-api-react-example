import * as addressesActions from '@stores/actions/pages/addresses';
import { IAddressIndexSignture, IAddressItem } from '@interfaces/addresses';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { api, ApiServiceAbstract, setAuthToken } from '@services/api';
import { TApiResponseData } from '@services/types';
import { IAddressDataResponse, IRequestUpdateAddressBody } from '@services/pages/Addresses/types';
import { errorMessageInform } from '@helpers/common';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';

export class AddressesService extends ApiServiceAbstract {
    public static async getCustomerAddresses(dispatch: Function, customerId: string): Promise<void> {
        dispatch(addressesActions.getAddressesPendingStateAction());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint: string = `customers/${ customerId }/addresses`;
            const response: TApiResponseData = await api.get(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                const addresses = response.data.data.map((address: IAddressDataResponse): IAddressItem =>
                    ({ id: address.id, ...address.attributes }));

                dispatch(addressesActions.getAddressesFulfilledStateAction(addresses));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(addressesActions.getAddressesRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(addressesActions.getAddressesRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async getOneCustomerAddress(
        dispatch: Function,
        customerId: string,
        addressId: string
    ): Promise<void> {
        dispatch(addressesActions.getOneAddressPendingStateAction());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint: string = `customers/${ customerId }/addresses/${ addressId }`;
            const response: TApiResponseData = await api.get(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                const { data: { attributes, id } } = response.data;

                const address: IAddressItem = Object.keys(attributes).reduce((acc: IAddressIndexSignture, current) => {
                    acc[current] = attributes[current];

                    return acc;
                }, {});
                address.id = id;

                dispatch(addressesActions.getOneAddressFulfilledStateAction({ data: address, addressId: id }));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(addressesActions.getOneAddressRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }
        } catch (error) {
            dispatch(addressesActions.getOneAddressRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async addAddress(dispatch: Function, payload: IAddressItem, customerId: string): Promise<void> {
        dispatch(addressesActions.addAddressPendingStateAction());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestUpdateAddressBody = {
                data: {
                    type: 'addresses',
                    attributes: payload
                }
            };

            const endpoint: string = `customers/${ customerId }/addresses`;
            const response: TApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const address = { id: response.data.data.id, ...response.data.data.attributes };
                dispatch(addressesActions.addAddressFulfilledStateAction(address));
                NotificationsMessage({
                    id: 'new.address.added.message',
                    type: typeNotificationSuccess
                });

                await AddressesService.getCustomerAddresses(dispatch, customerId);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(addressesActions.addAddressRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(addressesActions.addAddressRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async deleteAddress(dispatch: Function, addressId: string, customerId: string): Promise<void> {
        dispatch(addressesActions.deleteAddressPendingStateAction());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: TApiResponseData = await api.delete(
                `customers/${ customerId }/addresses/${ addressId }`, {}, { withCredentials: true }
            );

            if (response.ok) {
                dispatch(addressesActions.deleteAddressFulfilledStateAction(addressId));
                NotificationsMessage({
                    id: 'address.removed.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(addressesActions.deleteAddressRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(addressesActions.deleteAddressRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async updateAddress(
        dispatch: Function,
        addressId: string,
        customerId: string,
        payload: IAddressItem
    ): Promise<void> {
        dispatch(addressesActions.updateAddressPendingStateAction());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestUpdateAddressBody = {
                data: {
                    type: 'addresses',
                    id: addressId,
                    attributes: payload
                }
            };

            const response: TApiResponseData = await api.patch(
                `customers/${ customerId }/addresses/${ addressId }`, body, { withCredentials: true }
            );

            if (response.ok) {
                const updatedAddress = { addressId, data: response.data.data.attributes };
                dispatch(addressesActions.updateAddressFulfilledStateAction(updatedAddress));
                NotificationsMessage({
                    id: 'address.updated.message',
                    type: typeNotificationSuccess
                });

                await AddressesService.getCustomerAddresses(dispatch, customerId);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(addressesActions.updateAddressRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(addressesActions.updateAddressRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async addMultipleAddressAction(
        dispatch: Function,
        shipping: IAddressItem,
        customerId: string,
        billing: IAddressItem
    ): Promise<void> {
        dispatch(addressesActions.multipleAddressesPendingStateAction());
        await AddressesService.addAddress(dispatch, shipping, customerId);

        if (Boolean(billing)) {
            await AddressesService.addAddress(dispatch, billing, customerId);
        }
        dispatch(addressesActions.multipleAddressesFulfilledStateAction());
    }
}
