import {
    CUSTOMER_DATA_REQUEST,
    CUSTOMER_DATA_UPDATE,
    CUSTOMER_DELETE_ENTITY,
    CUSTOMER_PASSWORD_UPDATE
} from '@stores/actionTypes/pages/customerProfile';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { ICustomerDataParsed } from '@interfaces/customer';
import { ICustomerDataState, IPageCustomerProfileAction } from './types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IApiErrorResponse } from '@services/types';

export const initialState: ICustomerDataState = {
    data: {
        profile: null,
        isPasswordUpdated: null
    }
};

export const pageCustomerProfile = function (state: ICustomerDataState = initialState,
                                             action: IPageCustomerProfileAction): ICustomerDataState {
    switch (action.type) {
        case `${CUSTOMER_DATA_REQUEST}_REJECTED`:
        case `${CUSTOMER_DATA_UPDATE}_REJECTED`:
            return handleRejected(state, action.payloadRejected || {error: action.error});
        case `${CUSTOMER_DATA_REQUEST}_PENDING`:
        case `${CUSTOMER_DATA_UPDATE}_PENDING`:
            return handlePending(state);
        case `${CUSTOMER_DATA_REQUEST}_FULFILLED`:
        case `${CUSTOMER_DATA_UPDATE}_FULFILLED`:
            return handleFulfilled(state, action.payloadProfileFulfilled);
        case `${CUSTOMER_PASSWORD_UPDATE}_FULFILLED`:
            return handleUpdatePasswordFulfilled(state);
        case `${CUSTOMER_PASSWORD_UPDATE}_REJECTED`:
            return handleUpdatePasswordRejected(state, action.payloadRejected || {error: action.error});
        case `${CUSTOMER_PASSWORD_UPDATE}_PENDING`:
            return handleUpdatePasswordPending(state);
        case `${CUSTOMER_DELETE_ENTITY}_FULFILLED`:
            return handleDeleteCustomerFulfilled(state);
        case `${CUSTOMER_DELETE_ENTITY}_REJECTED`:
            return handleDeleteCustomerRejected(state, action.payloadRejected || {error: action.error});
        case `${CUSTOMER_DELETE_ENTITY}_PENDING`:
            return handleDeleteCustomerPending(state);
        default:
            return state;
    }
};

// handlers
const handleFulfilled = (customerState: ICustomerDataState, payload: ICustomerDataParsed | null) =>
    ({
        ...customerState,
        data: {
            ...customerState.data,
            profile: {...payload}
        },
        ...getReducerPartFulfilled()
    });

const handleRejected = (customerState: ICustomerDataState, payload: IApiErrorResponse) =>
    ({
        ...customerState,
        data: {
            ...customerState.data
        },
        ...getReducerPartRejected(payload.error)
    });

const handlePending = (customerState: ICustomerDataState) =>
    ({
        ...customerState,
        data: {
            ...customerState.data
        },
        ...getReducerPartPending()
    });

// Update customer password.

const handleUpdatePasswordFulfilled = (customerState: ICustomerDataState) =>
    ({
        ...customerState,
        data: {
            ...customerState.data,
            isPasswordUpdated: true
        },
        ...getReducerPartFulfilled()
    });

const handleUpdatePasswordPending = (customerState: ICustomerDataState) =>
    ({
        ...customerState,
        data: {
            ...customerState.data,
            isPasswordUpdated: false
        },
        ...getReducerPartPending()
    });

const handleUpdatePasswordRejected = (customerState: ICustomerDataState, payload: IApiErrorResponse) =>
    ({
        ...customerState,
        data: {
            ...customerState.data,
            isPasswordUpdated: false
        },
        ...getReducerPartRejected(payload.error)
    });

// Delete customer.

const handleDeleteCustomerFulfilled = (customerState: ICustomerDataState) =>
    ({
        ...customerState,
        data: {
            ...initialState.data
        },
        ...getReducerPartFulfilled()
    });

const handleDeleteCustomerPending = (customerState: ICustomerDataState) =>
    ({
        ...customerState,
        data: {
            ...customerState.data
        },
        ...getReducerPartPending()
    });

const handleDeleteCustomerRejected = (customerState: ICustomerDataState, payload: IApiErrorResponse) =>
    ({
        ...customerState,
        data: {
            ...customerState.data
        },
        ...getReducerPartRejected(payload.error)
    });

// selectors
export function isPageCustomerProfileInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCustomerProfile.initiated
    );
}

export function isCustomerProfilePresent(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCustomerProfile.data.profile
        && state.pageCustomerProfile.data.profile.id
    );
}

export function isPageCustomerProfileLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCustomerProfile.pending
        && state.pageCustomerProfile.pending === true
    );
}

export function isPageCustomerProfileRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCustomerProfile.rejected
        && state.pageCustomerProfile.rejected === true
    );
}

export function isPageCustomerProfileFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCustomerProfile.fulfilled
        && state.pageCustomerProfile.fulfilled === true
    );
}

export function getCustomerProfile(state: IReduxStore, props: IReduxOwnProps): ICustomerDataParsed | null {
    if (!isCustomerProfilePresent(state, props)) {
        return null;
    }

    return state.pageCustomerProfile.data.profile;
}

export function isCustomerPasswordUpdated(state: IReduxStore, props: IReduxOwnProps): boolean | null {
    return (isStateExist(state, props))
        ? state.pageCustomerProfile.data.isPasswordUpdated
        : null;
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageCustomerProfile);
}
