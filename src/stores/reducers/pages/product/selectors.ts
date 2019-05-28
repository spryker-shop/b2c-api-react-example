import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IProductDataParsed } from '@interfaces/product';

export const isPageProductStateInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageProduct.initiated && state.pageProduct.initiated === true);

export const isProductDetailsPresent = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageProduct.data.selectedProduct);

export const isPageProductStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    isStateExist(state, props) && state.pageProduct.pending && state.pageProduct.pending === true;

export const isPageProductStateRejected = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    isStateExist(state, props) && state.pageProduct.rejected && state.pageProduct.rejected === true;

export const isPageProductStateFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    isStateExist(state, props) && state.pageProduct.fulfilled && state.pageProduct.fulfilled === true;

export const getProduct = (state: IReduxStore, props: IReduxOwnProps): IProductDataParsed | null =>
    !(isStateExist(state, props) && state.pageProduct.data.selectedProduct) || isPageProductStateRejected(state, props)
        ? null
        : state.pageProduct.data.selectedProduct;

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.pageProduct);
