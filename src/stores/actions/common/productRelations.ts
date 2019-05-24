import * as actionTypes from '@stores/actionTypes/common/productRelations';
import { ProductRelationsService } from '@services/common/ProductRelations';
import { IProductRelationsItem } from '@interfaces/product';
import { IProductRelationsAction } from '@stores/reducers/common/productRelations/types';

export const productRelationsPendingAction = (): IProductRelationsAction => ({
    type: `${ actionTypes.PRODUCT_RELATIONS_REQUEST }_PENDING`
});

export const productRelationsRejectedAction = (message: string): IProductRelationsAction => ({
    type: `${ actionTypes.PRODUCT_RELATIONS_REQUEST }_REJECTED`,
    payloadRejected: { error: message }
});

export const productRelationsFulfilledAction = (payload: IProductRelationsItem[]): IProductRelationsAction => ({
    type: `${ actionTypes.PRODUCT_RELATIONS_REQUEST }_FULFILLED`,
    payloadFulfilled: payload
});

export const getProductRelationsAction = (payload: string) => (dispatch: Function, getState: Function) => {
    ProductRelationsService.getProductRelations(dispatch, payload);
};

export const getProductRelationsCartAction = (cartId: string, isUserLoggedIn: boolean, anonymId: string) =>
    (dispatch: Function, getState: Function) => {
        ProductRelationsService.getProductRelationsCart(dispatch, cartId, isUserLoggedIn, anonymId);
    };
