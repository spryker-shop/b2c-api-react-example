import { ICustomerState } from '@stores/reducers/pages/customerProfile/types';
import { ICustomerDataParsed } from '@interfaces/customer';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';

export const handleFulfilled = (state: ICustomerState, payload: ICustomerDataParsed): ICustomerState => ({
    ...state,
    data: {
        ...state.data,
        profile: { ...payload }
    },
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: ICustomerState, payload: IApiErrorResponse): ICustomerState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: ICustomerState): ICustomerState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleUpdatePasswordFulfilled = (state: ICustomerState): ICustomerState => ({
    ...state,
    data: {
        ...state.data,
        isPasswordUpdated: true
    },
    ...getReducerPartFulfilled()
});

export const handleUpdatePasswordPending = (state: ICustomerState): ICustomerState => ({
    ...state,
    data: {
        ...state.data,
        isPasswordUpdated: false
    },
    ...getReducerPartPending()
});

export const handleUpdatePasswordRejected = (state: ICustomerState, payload: IApiErrorResponse): ICustomerState => ({
    ...state,
    data: {
        ...state.data,
        isPasswordUpdated: false
    },
    ...getReducerPartRejected(payload.error)
});

export const handleDeleteCustomerFulfilled = (state: ICustomerState): ICustomerState => ({
    ...state,
    ...getReducerPartFulfilled()
});
