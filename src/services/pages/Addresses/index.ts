import * as addressesActions from '@stores/actions/pages/addresses';
import { IAddressIndexSignture, IAddressItem } from '@interfaces/addresses';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { api, setAuthToken } from '@services/api';
import { TApiResponseData } from '@services/types';
import { IAddressDataResponse } from '@services/pages/Addresses/types';
import { AddressesActionsService } from './addressActions';
import { errorMessageInform } from '@helpers/common';

export class AddressesService extends AddressesActionsService {
    public static async getCustomerAddresses(dispatch: Function, customerId: string): Promise<void> {
        dispatch(addressesActions.getAddressesPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `customers/${ customerId }/addresses`;
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
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `customers/${ customerId }/addresses/${ addressId }`;
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
}
