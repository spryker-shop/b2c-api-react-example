import { PRODUCT_RELATIONS_REQUEST } from '@stores/actionTypes/common/productRelations';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IProductRelationsState, IProductRelationsAction } from './types';

const initialState: IProductRelationsState = {
    data: {
        products: []
    },
};

export const productRelations = function (
    state: IProductRelationsState = initialState,
    action: IProductRelationsAction
): IProductRelationsState {
    switch (action.type) {
        case `${PRODUCT_RELATIONS_REQUEST}_PENDING`:
            return {
                data: {
                    products: []
                },
                ...getReducerPartPending()
            };
        case `${PRODUCT_RELATIONS_REQUEST}_REJECTED`:
            return {
                ...state,
                ...getReducerPartRejected(action.error)
            };
        case `${PRODUCT_RELATIONS_REQUEST}_FULFILLED`:
            return {
                data: {
                    products: action.payloadFulfilled
                },
                ...getReducerPartFulfilled()
            };
        default:
            return state;
    }
};
