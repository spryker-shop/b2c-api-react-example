import { IOrderDetailsState } from '@stores/reducers/pages/orderDetails/types';
import { IOrderDetailsParsed } from '@interfaces/order';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';

export const handleFulfilled = (state: IOrderDetailsState, payload: IOrderDetailsParsed | null): IOrderDetailsState => (
    {
        ...state,
        data: {
            ...state.data,
            ...payload
        },
        ...getReducerPartFulfilled()
    }
);

export const handleRejected = (state: IOrderDetailsState, payload: IApiErrorResponse): IOrderDetailsState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: IOrderDetailsState): IOrderDetailsState => ({
    ...state,
    ...getReducerPartPending()
});
