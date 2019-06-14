import { IOrderHistoryState } from '@stores/reducers/pages/orderHistory/types';
import { IOrderCollectionParsed } from '@interfaces/order';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';

export const handleFulfilled = (
    state: IOrderHistoryState,
    payload: IOrderCollectionParsed
): IOrderHistoryState => ({
    ...state,
    data: {
        ...state.data,
        ...payload
    },
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: IOrderHistoryState, payload: IApiErrorResponse): IOrderHistoryState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: IOrderHistoryState): IOrderHistoryState => ({
    ...state,
    ...getReducerPartPending()
});
