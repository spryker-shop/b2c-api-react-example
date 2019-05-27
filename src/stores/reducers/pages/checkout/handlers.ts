import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ICheckoutState } from '@stores/reducers/pages/checkout/types';

export const handleCheckoutPending = (state: ICheckoutState): ICheckoutState => ({
    ...state,
    data: {
        ...state.data,
        orderId: ''
    },
    ...getReducerPartPending()
});

export const handleAddressesRejected = (state: ICheckoutState, payload: IApiErrorResponse) => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handleAddressesFulfilled = (state: ICheckoutState, addresses: IAddressItem[]) => ({
    ...state,
    data: {
        ...state.data,
        currentAddress: null as null,
        addresses
    },
    ...getReducerPartFulfilled()
});
