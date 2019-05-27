import * as actionTypes from '@stores/actionTypes/common/productRelations';
import * as relationsHandlers  from './handlers';
import { IProductRelationsState, IProductRelationsAction } from './types';

const initialState: IProductRelationsState = {
    data: {
        products: []
    }
};

export const productRelations = function (
    state: IProductRelationsState = initialState,
    action: IProductRelationsAction
): IProductRelationsState {
    switch (action.type) {
        case `${actionTypes.PRODUCT_RELATIONS_REQUEST}_PENDING`:
            return relationsHandlers.handleProductRelationsPending(state);
        case `${actionTypes.PRODUCT_RELATIONS_REQUEST}_REJECTED`:
            return relationsHandlers.handleProductRelationsRejected(state, action.payloadRejected);
        case `${actionTypes.PRODUCT_RELATIONS_REQUEST}_FULFILLED`:
            return relationsHandlers.handleProductRelationsFulfilled(state, action.payloadFulfilled);
        default:
            return state;
    }
};
