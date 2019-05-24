import * as addressesActions from '@stores/actions/pages/addresses';
import { IAddressItem } from '@interfaces/addresses';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { TApiResponseData } from '@services/types';
import { IRequestUpdateAddressBody } from '@services/pages/Addresses/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';
import { AddressesService } from '@services/pages/Addresses';

export class AddressesActionsService extends ApiServiceAbstract {
    public static async addAddress(dispatch: Function, payload: IAddressItem, customerId: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);
            dispatch(addressesActions.addAddressPendingStateAction());

            const body: IRequestUpdateAddressBody = {
                data: {
                    type: 'addresses',
                    attributes: payload
                }
            };

            const endpoint = `customers/${ customerId }/addresses`;
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
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(addressesActions.addAddressRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async deleteAddress(dispatch: Function, addressId: string, customerId: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);
            dispatch(addressesActions.deleteAddressPendingStateAction());

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
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(addressesActions.deleteAddressRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async updateAddress(
        dispatch: Function,
        addressId: string,
        customerId: string,
        payload: IAddressItem
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);
            dispatch(addressesActions.updateAddressPendingStateAction());

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
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(addressesActions.updateAddressRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async addMultipleAddressAction(
        dispatch: Function,
        payload: IAddressItem,
        customerId: string,
        billing: IAddressItem
    ): Promise<void> {
        dispatch(addressesActions.multipleAddressesPendingStateAction());
        await AddressesActionsService.addAddress(dispatch, payload, customerId);

        if (Boolean(billing)) {
            await AddressesActionsService.addAddress(dispatch, billing, customerId);
        }
        dispatch(addressesActions.multipleAddressesFulfilledStateAction());
    }
}
