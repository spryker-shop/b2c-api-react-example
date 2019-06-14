import * as actionTypes from '@stores/actionTypes/pages/product';
import * as productHandlers  from '@stores/reducers/pages/product/handlers';
import { IPageProductAction, IProductState } from '@stores/reducers/pages/product/types';

export const initialState: IProductState = {
    data: {
        selectedProduct: null
    }
};

export const pageProduct = (state: IProductState = initialState, action: IPageProductAction): IProductState => {
    switch (action.type) {
        case `${actionTypes.PAGES_PRODUCT_REQUEST}_REJECTED`:
            return productHandlers.handleRejected(state, action.payloadRejected);
        case `${actionTypes.PAGES_PRODUCT_REQUEST}_PENDING`:
            return productHandlers.handlePending(state);
        case `${actionTypes.PAGES_PRODUCT_REQUEST}_FULFILLED`:
            return productHandlers.handleFulfilled(state, action.payloadFulfilled);
        default:
            return state;
    }
};
