import { PRODUCT_RELATIONS_REQUEST } from '@stores/actionTypes/common/productRelations';
import { ProductRelationsService } from '@services/common/ProductRelations';
import { TProductSKU } from '@interfaces/product';

export const productRelationsPendingAction = () => ({
    type: `${PRODUCT_RELATIONS_REQUEST}_PENDING`,
});

export const productRelationsRejectedAction = (message: string) => ({
    type: `${PRODUCT_RELATIONS_REQUEST}_REJECTED`,
    payloadRejected: { error: message },
});
// IProductRelations
export const productRelationsFulfilledAction = (payload: any) => ({
    type: `${PRODUCT_RELATIONS_REQUEST}_FULFILLED`,
    payloadFulfilled: payload,
});

export const getProductRelationsAction = function(payload: TProductSKU) {
    return (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelations(dispatch, payload);
    };
};
