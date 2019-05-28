import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ICheckoutResponseData, ICheckoutState } from '@stores/reducers/pages/checkout/types';

export const handleCheckoutPending = (state: ICheckoutState): ICheckoutState => ({
    ...state,
    data: {
        ...state.data,
        orderId: ''
    },
    ...getReducerPartPending()
});

export const handleCheckoutRejected = (state: ICheckoutState, payload: IApiErrorResponse) => ({
    ...state,
    data: {
        ...state.data,
        orderId: ''
    },
    ...getReducerPartRejected(payload.error)
});

export const handleCheckoutFulfilled = (state: ICheckoutState, payload: ICheckoutResponseData) => ({
    ...state,
    data: {
        ...state.data,
        payments: payload.payments,
        shipments: payload.shipments,
        addressesCollection: payload.addressesCollection
    },
    ...getReducerPartFulfilled()
});

export const handleSendCheckoutDataFulfilled = (state: ICheckoutState, orderId: string) => ({
    ...state,
    data: {
        ...state.data,
        orderId
    },
    ...getReducerPartFulfilled()
});
