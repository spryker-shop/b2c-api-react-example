import * as actionTypes from '@stores/actionTypes/pages/addresses';
import { IAddressItem } from '@interfaces/addresses';
import { AddressesService } from '@services/pages/Addresses';
import { IPageAddressesAction, IPageAddressesActionPayloadFulfilled } from '@stores/reducers/pages/addresses/types';

export const getAddressesPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.ADDRESSES_LIST + '_PENDING'
});

export const getAddressesFulfilledStateAction = (addresses: IAddressItem[]): IPageAddressesAction => ({
    type: actionTypes.ADDRESSES_LIST + '_FULFILLED',
    addresses
});

export const getAddressesRejectedStateAction = (message: string): IPageAddressesAction => ({
    type: actionTypes.ADDRESSES_LIST + '_REJECTED',
    payloadRejected: { error: message }
});

export const getAddressesAction = (customerId: string): Function => (dispatch: Function, getState: Function): void => {
    AddressesService.getCustomerAddresses(dispatch, customerId);
};

export const addAddressPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.ADD_ADDRESS + '_PENDING'
});

export const addAddressFulfilledStateAction = (address: IAddressItem): IPageAddressesAction => ({
    type: actionTypes.ADD_ADDRESS + '_FULFILLED',
    address
});

export const addAddressRejectedStateAction = (message: string): IPageAddressesAction => ({
    type: actionTypes.ADD_ADDRESS + '_REJECTED',
    payloadRejected: { error: message }
});

export const addAddressAction = (payload: IAddressItem, customerId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        AddressesService.addAddress(dispatch, payload, customerId);
    };

export const updateAddressPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.UPDATE_ADDRESS + '_PENDING'
});

export const updateAddressFulfilledStateAction =
    (payload: IPageAddressesActionPayloadFulfilled): IPageAddressesAction => ({
        type: actionTypes.UPDATE_ADDRESS + '_FULFILLED',
        payloadFulfilled: payload
    });

export const updateAddressRejectedStateAction = (message: string): IPageAddressesAction => ({
    type: actionTypes.UPDATE_ADDRESS + '_REJECTED',
    payloadRejected: { error: message }
});

export const updateAddressAction = (addressId: string, customerId: string, payload: IAddressItem): Function =>
    (dispatch: Function, getState: Function): void => {
        AddressesService.updateAddress(dispatch, addressId, customerId, payload);
    };

export const deleteAddressPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.DELETE_ADDRESS + '_PENDING'
});

export const deleteAddressFulfilledStateAction = (addressId: string): IPageAddressesAction => ({
    type: actionTypes.DELETE_ADDRESS + '_FULFILLED',
    addressId
});

export const deleteAddressRejectedStateAction = (message: string): IPageAddressesAction => ({
    type: actionTypes.DELETE_ADDRESS + '_REJECTED',
    payloadRejected: { error: message }
});

export const deleteAddressAction = (addressId: string, customerId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        AddressesService.deleteAddress(dispatch, addressId, customerId);
    };

export const getOneAddressPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.GET_ONE_ADDRESS + '_PENDING'
});

export const getOneAddressFulfilledStateAction =
    (payload: IPageAddressesActionPayloadFulfilled): IPageAddressesAction => ({
        type: actionTypes.GET_ONE_ADDRESS + '_FULFILLED',
        payloadFulfilled: payload
    });

export const getOneAddressRejectedStateAction = (message: string): IPageAddressesAction => ({
    type: actionTypes.GET_ONE_ADDRESS + '_REJECTED',
    payloadRejected: { error: message }
});

export const getOneAddressAction = (customerId: string, addressId: string): Function =>
    (dispatch: Function, getState: Function): void => {
        AddressesService.getOneCustomerAddress(dispatch, customerId, addressId);
    };

export const multipleAddressesPendingStateAction = (): IPageAddressesAction => ({
    type: actionTypes.MULTIPLE_ADDRESSES + '_PENDING'
});

export const multipleAddressesFulfilledStateAction = (): IPageAddressesAction => ({
    type: actionTypes.MULTIPLE_ADDRESSES + '_PENDING'
});

export const addMultipleAddressAction =
    (payload: IAddressItem, customerId: string, billing: IAddressItem | null): Function =>
        (dispatch: Function, getState: Function): void => {
            AddressesService.addMultipleAddressAction(dispatch, payload, customerId, billing);
        };

export const setCurrentAddressAction = (addressId: string): IPageAddressesAction => ({
    type: actionTypes.SET_CURRENT_ADDRESS + '_FULFILLED',
    addressId
});

export const clearAddressAction = (): IPageAddressesAction => ({
    type: actionTypes.CLEAR_ADDRESS
});
