import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';

export const isPageCheckoutStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.pending);

export const isPageCheckoutFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.fulfilled);

export const isPageCheckoutInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.initiated);

export const getShipmentMethodsFromStore = (state: IReduxStore, props: IReduxOwnProps): IShipmentMethod[] | null =>
    isShipmentMethodsExist(state, props) ? state.pageCheckout.data.shipments : null;

export const isShipmentMethodsExist = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.data.shipments);

export const getPaymentMethodsFromStore = (state: IReduxStore, props: IReduxOwnProps): IPaymentMethod[] | null =>
    isPaymentMethodsExist(state, props) ? state.pageCheckout.data.payments : null;

export const isPaymentMethodsExist = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.data.payments);

export const getAddressesCollectionFromCheckoutStore = (
    state: IReduxStore,
    props: IReduxOwnProps
): IAddressItemCollection[] | null => checkAddressesCollectionExist(state, props)
    ? state.pageCheckout.data.addressesCollection : null;

export const checkAddressesCollectionExist = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCheckout.data.addressesCollection &&
        state.pageCheckout.data.addressesCollection.length);

export const getCreatedOrder = (state: IReduxStore, props: IReduxOwnProps): string =>
    isStateExist(state, props) ? state.pageCheckout.data.orderId : '';

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.pageCheckout.data);
