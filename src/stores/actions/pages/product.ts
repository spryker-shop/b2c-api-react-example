import { PAGES_PRODUCT_REQUEST, PRODUCT_AVAILABILITY_REQUEST } from '@stores/actionTypes/pages/product';
import { ProductService } from '@services/pages/Product';
import { IConcreteProductAvailability, IProductDataParsed, TProductSKU } from '@interfaces/product';
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

// Product availability

export const getProductAvailabilityPendingStateAction = (): IPageProductAction => ({
    type: PRODUCT_AVAILABILITY_REQUEST + '_PENDING',
});

export const getProductAvailabilityRejectedStateAction = (message: string): IPageProductAction => ({
    type: PRODUCT_AVAILABILITY_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const getProductAvailabilityFulfilledStateAction = (payload: IConcreteProductAvailability):
    IPageProductAction => ({
    type: PRODUCT_AVAILABILITY_REQUEST + '_FULFILLED',
    payloadAvailability: payload,
});

export const getProductAvailabilityAction = function (sku: TProductSKU) {
    return (dispatch: Function, getState: Function) => (
        ProductService.getConcreteProductAvailability(dispatch, sku)
    );
};
