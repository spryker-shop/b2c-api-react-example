import produce from 'immer';
import {
    ADD_ADDRESS,
    ADDRESSES_LIST,
    DELETE_ADDRESS,
    SET_CURRENT_ADDRESS,
    UPDATE_ADDRESS,
    GET_ONE_ADDRESS,
    CLEAR_ADDRESS
} from '@stores/actionTypes/pages/addresses';
import { IAddressItem } from '@interfaces/addresses';
import { IAddressesState, IPageAddressesAction } from '@stores/reducers/pages/Addresses/types';

const initialState: IAddressesState = {
    data: {
        addresses: [],
        currentAddress: null,
    },
};

export const pageAddresses = produce<IAddressesState>(
    (draft: IAddressesState, action: IPageAddressesAction) => {
        switch (action.type) {
            case `${ADDRESSES_LIST}_PENDING`:
            case `${ADD_ADDRESS}_PENDING`:
            case `${DELETE_ADDRESS}_PENDING`:
            case `${UPDATE_ADDRESS}_PENDING`:
            case `${GET_ONE_ADDRESS}_PENDING`:
                draft.error = null;
                draft.pending = true;
                draft.fulfilled = false;
                draft.rejected = false;
                draft.initiated = false;
                break;
            case `${ADDRESSES_LIST}_REJECTED`:
            case `${ADD_ADDRESS}_REJECTED`:
            case `${DELETE_ADDRESS}_REJECTED`:
            case `${UPDATE_ADDRESS}_REJECTED`:
            case `${GET_ONE_ADDRESS}_REJECTED`:
                draft.error = action.error || action.payloadRejected.error;
                draft.pending = false;
                draft.fulfilled = false;
                draft.rejected = true;
                draft.initiated = false;
                draft.data.currentAddress = null;
                break;
            case `${ADDRESSES_LIST}_FULFILLED`:
                draft.data.addresses = action.addresses;
                draft.data.currentAddress = null;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            case `${ADD_ADDRESS}_FULFILLED`: {
                const addresses: IAddressItem[] = [...draft.data.addresses, action.address];
                draft.data.addresses = addresses;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${DELETE_ADDRESS}_FULFILLED`: {
                const addresses: IAddressItem[] = draft.data.addresses.filter((
                    address: IAddressItem
                ) => address.id !== action.addressId);
                draft.data.addresses = addresses;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                draft.initiated = true;
                break;
            }
            case `${UPDATE_ADDRESS}_FULFILLED`: {
                const addresses: IAddressItem[] = draft.data.addresses
                    .map((address: IAddressItem) => (
                        address.id === action.payloadFulfilled.addressId
                            ? {...action.payloadFulfilled.data, id: action.payloadFulfilled.addressId}
                            : address)
                    );
                draft.data.addresses = addresses;
                draft.data.currentAddress = null;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                break;
            }
            case SET_CURRENT_ADDRESS: {
                if (action.addressId) {
                    const currentAddress: IAddressItem = draft.data.addresses.find((
                        address: IAddressItem
                    ) => address.id === action.addressId);
                    draft.data.currentAddress = currentAddress || null;
                } else {
                    draft.data.currentAddress = null;
                }
                break;
            }
            case `${GET_ONE_ADDRESS}_FULFILLED`: {
                draft.data.currentAddress = action.payloadFulfilled.data;
                draft.error = null;
                draft.pending = false;
                draft.fulfilled = true;
                draft.rejected = false;
                break;
            }
            case `${CLEAR_ADDRESS}`: {
                draft.data.addresses = initialState.data.addresses;
                draft.data.currentAddress = initialState.data.currentAddress;
                break;
            }
            default:
                break;
        }
    },
    initialState,
);
