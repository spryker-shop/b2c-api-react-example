import { IAddressesState, IPageAddressesActionPayloadFulfilled } from '@stores/reducers/pages/addresses/types';
import {
    clearReducerPartState,
    getReducerPartFulfilled,
    getReducerPartPending,
    getReducerPartRejected
} from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { IAddressItem } from '@interfaces/addresses';

export const handleAddressesPending = (state: IAddressesState): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
    },
    ...getReducerPartPending()
});

export const handleAddressesRejected = (state: IAddressesState, payload: IApiErrorResponse): IAddressesState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handleAddressesFulfilled = (state: IAddressesState, addresses: IAddressItem[]): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
        currentAddress: null as null,
        addresses
    },
    ...getReducerPartFulfilled()
});

export const handleAddAddressFulfilled = (state: IAddressesState, address: IAddressItem): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
        addresses: [...state.data.addresses, address]
    },
    ...getReducerPartFulfilled()
});

export const handleDeleteAddressFulfilled = (state: IAddressesState, addressId: string): IAddressesState => {
    const addresses: IAddressItem[] = state.data.addresses.filter((address: IAddressItem) => address.id !== addressId);

    return {
        ...state,
        data: {
            ...state.data,
            addresses
        },
        ...getReducerPartFulfilled()
    };
};

export const handleUpdateAddressFulfilled = (
    state: IAddressesState,
    payload: IPageAddressesActionPayloadFulfilled
): IAddressesState => {
    const addresses: IAddressItem[] = state.data.addresses.map(address => (address.id === payload.addressId
        ? { ...payload.data, id: payload.addressId } : address));

    return {
        ...state,
        data: {
            ...state.data,
            currentAddress: null as null,
            addresses
        },
        ...getReducerPartFulfilled()
    };
};

export const handleSetCurrentAddress = (state: IAddressesState, addressId: string): IAddressesState => {
    const currentAddress = addressId ? state.data.addresses.find(address => address.id === addressId) : null;

    return {
        ...state,
        data: {
            ...state.data,
            currentAddress
        }
    };
};

export const handleGetOneAddress = (state: IAddressesState, address: IAddressItem): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
        currentAddress: address
    },
    ...getReducerPartFulfilled()
});

export const handleClearAddress = (state: IAddressesState): IAddressesState => ({
    ...state,
    ...clearReducerPartState()
});

export const handleMultipleAddressesPending = (state: IAddressesState): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
        isMultipleAddressesLoading: true
    }
});

export const handleMultipleAddressesFulfilled = (state: IAddressesState): IAddressesState => ({
    ...state,
    data: {
        ...state.data,
        isMultipleAddressesLoading: false
    }
});
