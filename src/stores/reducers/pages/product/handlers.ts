import { IProductState } from '@stores/reducers/pages/product/types';
import { IProductDataParsed } from '@interfaces/product';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';

export const handleFulfilled = (state: IProductState, payload: IProductDataParsed | null): IProductState => ({
    ...state,
    data: {
        ...state.data,
        selectedProduct: { ...payload }
    },
    ...getReducerPartFulfilled()
});

export const handleRejected = (state: IProductState, payload: IApiErrorResponse): IProductState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handlePending = (state: IProductState): IProductState => ({
    ...state,
    ...getReducerPartPending()
});
