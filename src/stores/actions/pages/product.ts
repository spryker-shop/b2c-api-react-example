import { PAGES_PRODUCT_REQUEST } from '@stores/actionTypes/pages/product';
import { ProductService } from '@services/pages/Product';
import { IProductDataParsed } from '@helpers/parsing/product/types';
import { IPageProductAction } from '@stores/reducers/pages/Product/types';

export const getProductDataItemPendingStateAction = (): IPageProductAction => ({
    type: PAGES_PRODUCT_REQUEST + '_PENDING',
});

export const getProductDataRejectedStateAction = (message: string): IPageProductAction => ({
    type: PAGES_PRODUCT_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const getProductDataFulfilledStateAction = (payload: IProductDataParsed): IPageProductAction => ({
    type: PAGES_PRODUCT_REQUEST + '_FULFILLED',
    payloadFulfilled: payload,
});

export const getProductDataAction = function (sku: string) {
    return (dispatch: Function, getState: Function) => {
        ProductService.getAbstractData(dispatch, sku);
    };
};
