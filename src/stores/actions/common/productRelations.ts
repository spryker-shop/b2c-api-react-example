import { PRODUCT_RELATIONS_REQUEST } from '@stores/actionTypes/common/productRelations';
import { ProductRelationsService } from '@services/common/ProductRelations';
import { IProductRelationsItem } from '@interfaces/product';

export const productRelationsPendingAction = () => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_PENDING`
});

export const productRelationsRejectedAction = (message: string) => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_REJECTED`,
    payloadRejected: { error: message }
});

export const productRelationsFulfilledAction = (payload: IProductRelationsItem[]) => ({
    type: `${ PRODUCT_RELATIONS_REQUEST }_FULFILLED`,
    payloadFulfilled: payload
});

export const getProductRelationsAction = function (payload: string) {
    return (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelations(dispatch, payload);
    };
};

export const getProductRelationsCartAction = function (cartId: string, isUserLoggedIn: boolean, anonymId: string) {
    return (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelationsCart(dispatch, cartId, isUserLoggedIn, anonymId);
    };
};
