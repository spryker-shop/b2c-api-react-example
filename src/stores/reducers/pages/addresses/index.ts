import * as actionTypes from '@stores/actionTypes/pages/addresses';
import * as addressesHandlers  from '@stores/reducers/pages/addresses/handlers';
import { IAddressesState, IPageAddressesAction } from '@stores/reducers/pages/addresses/types';

const initialState: IAddressesState = {
    data: {
        isMultipleAddressesLoading: false,
        addresses: [],
        currentAddress: null
    }
};

export const pageAddresses = (
    state: IAddressesState = initialState,
    action: IPageAddressesAction
): IAddressesState => {
    switch (action.type) {
        case `${actionTypes.ADDRESSES_LIST}_PENDING`:
        case `${actionTypes.ADD_ADDRESS}_PENDING`:
        case `${actionTypes.DELETE_ADDRESS}_PENDING`:
        case `${actionTypes.UPDATE_ADDRESS}_PENDING`:
        case `${actionTypes.GET_ONE_ADDRESS}_PENDING`:
            return addressesHandlers.handleAddressesPending(state);
        case `${actionTypes.MULTIPLE_ADDRESSES}_PENDING`:
            return addressesHandlers.handleMultipleAddressesPending(state);
        case `${actionTypes.ADDRESSES_LIST}_REJECTED`:
        case `${actionTypes.ADD_ADDRESS}_REJECTED`:
        case `${actionTypes.DELETE_ADDRESS}_REJECTED`:
        case `${actionTypes.UPDATE_ADDRESS}_REJECTED`:
        case `${actionTypes.GET_ONE_ADDRESS}_REJECTED`:
            return addressesHandlers.handleAddressesRejected(state, action.payloadRejected);
        case `${actionTypes.MULTIPLE_ADDRESSES}_FULFILLED`:
            return addressesHandlers.handleMultipleAddressesFulfilled(state);
        case `${actionTypes.ADDRESSES_LIST}_FULFILLED`:
            return addressesHandlers.handleAddressesFulfilled(state, action.addresses);
        case `${actionTypes.ADD_ADDRESS}_FULFILLED`:
            return addressesHandlers.handleAddAddressFulfilled(state, action.address);
        case `${actionTypes.DELETE_ADDRESS}_FULFILLED`:
            return addressesHandlers.handleDeleteAddressFulfilled(state, action.addressId);
        case `${actionTypes.UPDATE_ADDRESS}_FULFILLED`:
            return addressesHandlers.handleUpdateAddressFulfilled(state, action.payloadFulfilled);
        case actionTypes.SET_CURRENT_ADDRESS:
            return addressesHandlers.handleSetCurrentAddress(state, action.addressId);
        case `${actionTypes.GET_ONE_ADDRESS}_FULFILLED`:
            return addressesHandlers.handleGetOneAddress(state, action.payloadFulfilled.data);
        case actionTypes.CLEAR_ADDRESS:
            return addressesHandlers.handleClearAddress(initialState);
        default:
            return state;
    }
};
