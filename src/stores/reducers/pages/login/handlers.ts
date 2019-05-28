import { ILoginState } from '@stores/reducers/pages/login/types';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ICustomerLoginDataParsed } from '@interfaces/customer';

export const handleFulfilled = (state: ILoginState): ILoginState => ({
    ...state,
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: ILoginState, payload: IApiErrorResponse): ILoginState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: ILoginState): ILoginState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleAuthenticationFulfilled = (state: ILoginState, payload: ICustomerLoginDataParsed): ILoginState => ({
    ...state,
    data: {
        ...state.data,
        isAuth: true,
        ...payload
    },
    ...getReducerPartFulfilled(),
});

export const handleLoginDataSetToStoreFilfilled = (state: ILoginState, payload: string): ILoginState => ({
    ...state,
    data: {
        ...state.data,
        customerUsername: payload || null
    }
});
