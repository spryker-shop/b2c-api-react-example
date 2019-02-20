import {
    ADD_ADDRESS,
    ADDRESSES_LIST,
    DELETE_ADDRESS,
    UPDATE_ADDRESS,
    SET_CURRENT_ADDRESS,
    GET_ONE_ADDRESS
} from '@stores/actionTypes/pages/addresses';
import { IAddressItem } from '@interfaces/addresses';
import { AddressesService } from '@services/pages/Addresses';

export const getAllListPendingState = {
    type: ADDRESSES_LIST + '_PENDING',
};

export const addAddressPendingState = {
    type: ADD_ADDRESS + '_PENDING',
};

export const updateAddressPendingState = {
    type: UPDATE_ADDRESS + '_PENDING',
};

export const deleteAddressPendingState = {
    type: DELETE_ADDRESS + '_PENDING'
};

export const getOneAddressPendingState = {
    type: GET_ONE_ADDRESS + '_PENDING',
};

export const getAddressesAction = function (customerId: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(getAllListPendingState);
        AddressesService.getCustomerAddresses(ADDRESSES_LIST, dispatch, customerId);
    };
};

export const getOneAddressAction = function (customerId: string, addressId: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(getOneAddressPendingState);
        AddressesService.getOneCustomerAddress(GET_ONE_ADDRESS, dispatch, customerId, addressId);
    };
};

export const addAddressAction = function (payload: IAddressItem, customerId: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(addAddressPendingState);
        AddressesService.addAddress(ADD_ADDRESS, dispatch, payload, customerId);
    };
};

export const deleteAddressAction = function (addressId: string, customerId: string) {
    return (dispatch: Function, getState: Function) => {
        dispatch(deleteAddressPendingState);
        AddressesService.deleteAddress(DELETE_ADDRESS, dispatch, addressId, customerId);
    };
};

export const updateAddressAction = function (addressId: string, customerId: string, payload: IAddressItem) {
    return (dispatch: Function, getState: Function) => {
        dispatch(updateAddressPendingState);
        AddressesService.updateAddress(UPDATE_ADDRESS, dispatch, addressId, customerId, payload);
    };
};

export const setCurrentAddressAction = function (addressId: string) {
    return {
        type: SET_CURRENT_ADDRESS,
        addressId,
    };
};
