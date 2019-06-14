import * as actionTypes from '@stores/actionTypes/pages/product';
import { ProductService } from '@services/pages/Product';
import { IProductDataParsed } from '@interfaces/product';
import { IPageProductAction } from '@stores/reducers/pages/Product/types';

export const getProductDataItemPendingStateAction = (): IPageProductAction => ({
    type: actionTypes.PAGES_PRODUCT_REQUEST + '_PENDING'
});

export const getProductDataRejectedStateAction = (message: string): IPageProductAction => ({
    type: actionTypes.PAGES_PRODUCT_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const getProductDataFulfilledStateAction = (payload: IProductDataParsed): IPageProductAction => ({
    type: actionTypes.PAGES_PRODUCT_REQUEST + '_FULFILLED',
    payloadFulfilled: payload
});

export const getProductDataAction = (sku: string): Function => (dispatch: Function, getState: Function): void => {
    ProductService.getAbstractData(dispatch, sku);
};
