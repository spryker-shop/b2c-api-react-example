import {
    CUSTOMER_DATA_REQUEST,
    CUSTOMER_DATA_UPDATE,
    CUSTOMER_DELETE_ENTITY,
    CUSTOMER_PASSWORD_UPDATE,
    LOGIN_DATA_SET_TO_STORE,
} from '@stores/actionTypes/pages/customerProfile';
import { CustomerProfileService } from '@services/pages/CustomerProfile';
import {
    ICustomerDataParsed,
    ICustomerProfileIdentity,
    ICustomerProfilePassword,
    ILoginDataToLocalStorage,
    TCustomerReference,
} from '@interfaces/customer';
import { IPageCustomerProfileAction } from '@stores/reducers/pages/customerProfile/types';
import { IPageLoginAction } from '@stores/reducers/pages/login/types';

// Retrieve customer data.
export const getCustomerProfilePendingStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_REQUEST + '_PENDING',
});

export const getCustomerProfileRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const getCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed): IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_REQUEST + '_FULFILLED',
    payloadProfileFulfilled: payload,
});

export const getCustomerProfileAction = function (customerReference: TCustomerReference) {
    return (dispatch: Function, getState: Function) => {
        CustomerProfileService.getProfileData(dispatch, customerReference);
    };
};

// Update customer data
export const updateCustomerProfilePendingStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_UPDATE + '_PENDING',
});

export const updateCustomerProfileRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_UPDATE + '_REJECTED',
    payloadRejected: {error: message},
});

export const updateCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed):
    IPageCustomerProfileAction => ({
    type: CUSTOMER_DATA_UPDATE + '_FULFILLED',
    payloadProfileFulfilled: payload,
});

export const updateCustomerProfileAction = function (
    customerReference: TCustomerReference,
    payload: ICustomerProfileIdentity
) {
    return (dispatch: Function, getState: Function) => {
        CustomerProfileService.updateProfileData(dispatch, customerReference, payload);
    };
};

// Save login data to LocalStorage
export const saveLoginDataToStoreAction = (payload: ILoginDataToLocalStorage): IPageLoginAction => ({
    type: LOGIN_DATA_SET_TO_STORE + '_FULFILLED',
    payloadStoreFulfilled: payload,
});

// Update customer password.
export const updateCustomerPasswordPendingStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_PASSWORD_UPDATE + '_PENDING',
});

export const updateCustomerPasswordRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: CUSTOMER_PASSWORD_UPDATE + '_REJECTED',
    payloadRejected: {error: message},
});

export const updateCustomerPasswordFulfilledStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_PASSWORD_UPDATE + '_FULFILLED',
});

export const updateCustomerPasswordAction = function (
    customerReference: TCustomerReference, payload: ICustomerProfilePassword
) {
    return (dispatch: Function, getState: Function) => {
        CustomerProfileService.updatePasswordData(dispatch, customerReference, payload);
    };
};

// Delete Customer Entity
export const deleteCustomerPendingStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_DELETE_ENTITY + '_PENDING',
});

export const deleteCustomerRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: CUSTOMER_DELETE_ENTITY + '_REJECTED',
    payloadRejected: {error: message},
});

export const deleteCustomerFulfilledStateAction = (): IPageCustomerProfileAction => ({
    type: CUSTOMER_DELETE_ENTITY + '_FULFILLED',
});

export const deleteCustomerAction = function (customerReference: TCustomerReference) {
    return (dispatch: Function, getState: Function) => {
        CustomerProfileService.deleteCustomerEntity(dispatch, customerReference);
    };
};
