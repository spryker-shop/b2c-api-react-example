import { IReduxState } from '@stores/reducers/types';
import { PAGES_PRODUCT_REQUEST } from '@stores/actionTypes/pages/product';
import { IProductDataParsed } from '@helpers/parsing/product/types';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';

export interface IProductState extends IReduxState {
    data: {
        selectedProduct: IProductDataParsed | null,
    };
}

export const initialState: IProductState = {
    data: {
        selectedProduct: null,
    },
};

export const pageProduct = function (state: IProductState = initialState, action: any): IProductState {
    switch (action.type) {
        case `${PAGES_PRODUCT_REQUEST}_REJECTED`:
            /* return {
               ...state,
               ...getReducerPartRejected(action.error),
             };*/
            return handleRejected(state, action.payload);
        case `${PAGES_PRODUCT_REQUEST}_PENDING`:
            /*return {
              ...state,
              data: {
                ...state.data,
                selectedProduct: null,
              },
              ...getReducerPartPending(),
            };*/
            return handlePending(state, action.payload);
        case `${PAGES_PRODUCT_REQUEST}_FULFILLED`:
            /*  return {
                ...state,
                data: {
                  ...state.data,
                  selectedProduct: action.payload,
                },
                ...getReducerPartFulfilled(),
              };*/
            return handleFulfilled(state, action.payload);
        default:
            return state;
    }
};

// handlers
const handleFulfilled = (productState: IProductState, payload: IProductDataParsed | null) => ({
    ...productState,
    data: {
        ...productState.data,
        selectedProduct: {...payload},
    },
    ...getReducerPartFulfilled(),
});

const handleRejected = (productState: IProductState, payload: any) => ({
    ...productState,
    data: {
        ...productState.data,
    },
    ...getReducerPartRejected(payload.error),
});

const handlePending = (productState: IProductState, payload: any) => ({
    ...productState,
    data: {
        ...productState.data,
    },
    ...getReducerPartPending(),
});

// selectors
export function isPageProductStateInitiated(state: any, props: any): boolean {
    return Boolean(isStateExist(state, props) && state.pageProduct.initiated && state.pageProduct.initiated === true);
}

export function isProductDetailsPresent(state: any, props: any): boolean {
    return Boolean(isStateExist(state, props) && state.pageProduct.data.selectedProduct);
}

export function isPageProductStateLoading(state: any, props: any): boolean {
    return (isStateExist(state, props) && state.pageProduct.pending && state.pageProduct.pending === true);
}

export function isPageProductStateRejected(state: any, props: any): boolean {
    return (isStateExist(state, props) && state.pageProduct.rejected && state.pageProduct.rejected === true);
}

export function isPageProductStateFulfilled(state: any, props: any): boolean {
    return (isStateExist(state, props) && state.pageProduct.fulfilled && state.pageProduct.fulfilled === true);
}

export function getProduct(state: any, props: any): IProductDataParsed | null {
    if (isPageProductStateRejected(state, props)) {
        return null;
    }

    return (isStateExist(state, props) && state.pageProduct.data.selectedProduct)
        ? state.pageProduct.data.selectedProduct
        : null;
}

function isStateExist(state: any, props: any): boolean {
    return Boolean(state.pageProduct);
}
