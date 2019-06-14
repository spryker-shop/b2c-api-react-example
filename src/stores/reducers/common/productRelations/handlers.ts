import { IProductRelationsState } from '@stores/reducers/common/productRelations/types';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { IProductRelationsItem } from '@interfaces/product';

export const handleProductRelationsPending = (state: IProductRelationsState): IProductRelationsState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleProductRelationsRejected = (
    state: IProductRelationsState,
    payload: IApiErrorResponse
): IProductRelationsState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handleProductRelationsFulfilled = (
    state: IProductRelationsState,
    payload: IProductRelationsItem[]
): IProductRelationsState => ({
    ...state,
    data: {
        products: payload
    },
    ...getReducerPartFulfilled()
});
