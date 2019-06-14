import * as actionTypes  from '@stores/actionTypes/pages/customerProfile';
import * as customerHandlers  from '@stores/reducers/pages/customerProfile/handlers';
import { ICustomerState, IPageCustomerProfileAction } from '@stores/reducers/pages/customerProfile/types';

export const initialState: ICustomerState = {
    data: {
        profile: null,
        isPasswordUpdated: null
    }
};

export const pageCustomerProfile = (
    state: ICustomerState = initialState,
    action: IPageCustomerProfileAction
): ICustomerState => {
    switch (action.type) {
        case `${actionTypes.CUSTOMER_DATA_REQUEST}_REJECTED`:
        case `${actionTypes.CUSTOMER_DATA_UPDATE}_REJECTED`:
        case `${actionTypes.CUSTOMER_DELETE_ENTITY}_REJECTED`:
            return customerHandlers.handleRejected(state, action.payloadRejected);
        case `${actionTypes.CUSTOMER_DELETE_ENTITY}_PENDING`:
        case `${actionTypes.CUSTOMER_DATA_REQUEST}_PENDING`:
        case `${actionTypes.CUSTOMER_DATA_UPDATE}_PENDING`:
            return customerHandlers.handlePending(state);
        case `${actionTypes.CUSTOMER_DATA_REQUEST}_FULFILLED`:
        case `${actionTypes.CUSTOMER_DATA_UPDATE}_FULFILLED`:
            return customerHandlers.handleFulfilled(state, action.payloadProfileFulfilled);
        case `${actionTypes.CUSTOMER_PASSWORD_UPDATE}_FULFILLED`:
            return customerHandlers.handleUpdatePasswordFulfilled(state);
        case `${actionTypes.CUSTOMER_PASSWORD_UPDATE}_REJECTED`:
            return customerHandlers.handleUpdatePasswordRejected(state, action.payloadRejected);
        case `${actionTypes.CUSTOMER_PASSWORD_UPDATE}_PENDING`:
            return customerHandlers.handleUpdatePasswordPending(state);
        case `${actionTypes.CUSTOMER_DELETE_ENTITY}_FULFILLED`:
            return customerHandlers.handleDeleteCustomerFulfilled(initialState);
        default:
            return state;
    }
};
