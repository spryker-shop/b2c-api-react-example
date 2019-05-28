import * as actionTypes from '@stores/actionTypes/pages/customerProfile';
import { CustomerProfileService } from '@services/pages/CustomerProfile';
import { ICustomerDataParsed, ICustomerProfileIdentity, ICustomerProfilePassword } from '@interfaces/customer';
import { IPageCustomerProfileAction } from '@stores/reducers/pages/customerProfile/types';

export const getCustomerProfilePendingStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_REQUEST + '_PENDING'
});

export const getCustomerProfileRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const getCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_REQUEST + '_FULFILLED',
    payloadProfileFulfilled: payload
});

export const getCustomerProfileAction = (customerReference: string): Function =>
    (dispatch: Function, getState: Function): void => {
        CustomerProfileService.getProfileData(dispatch, customerReference);
    };

export const updateCustomerProfilePendingStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_UPDATE + '_PENDING'
});

export const updateCustomerProfileRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_UPDATE + '_REJECTED',
    payloadRejected: { error: message }
});

export const updateCustomerProfileFulfilledStateAction = (payload: ICustomerDataParsed):
    IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DATA_UPDATE + '_FULFILLED',
    payloadProfileFulfilled: payload
});

export const updateCustomerProfileAction = (customerReference: string, payload: ICustomerProfileIdentity): Function =>
    (dispatch: Function, getState: Function) => {
        CustomerProfileService.updateProfileData(dispatch, customerReference, payload);
    };

export const updateCustomerPasswordPendingStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_PASSWORD_UPDATE + '_PENDING'
});

export const updateCustomerPasswordRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_PASSWORD_UPDATE + '_REJECTED',
    payloadRejected: { error: message }
});

export const updateCustomerPasswordFulfilledStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_PASSWORD_UPDATE + '_FULFILLED'
});

export const updateCustomerPasswordAction = (customerReference: string, payload: ICustomerProfilePassword): Function =>
    (dispatch: Function, getState: Function) => {
        CustomerProfileService.updatePasswordData(dispatch, customerReference, payload);
    };

export const deleteCustomerPendingStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DELETE_ENTITY + '_PENDING'
});

export const deleteCustomerRejectedStateAction = (message: string): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DELETE_ENTITY + '_REJECTED',
    payloadRejected: { error: message }
});

export const deleteCustomerFulfilledStateAction = (): IPageCustomerProfileAction => ({
    type: actionTypes.CUSTOMER_DELETE_ENTITY + '_FULFILLED'
});

export const deleteCustomerAction = (customerReference: string): Function =>
    (dispatch: Function, getState: Function): void => {
        CustomerProfileService.deleteCustomerEntity(dispatch, customerReference);
    };
