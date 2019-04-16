import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';

export function isPageCheckoutStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.pending);
}

export function isPageCheckoutStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.rejected);
}

export function isPageCheckoutFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.fulfilled);
}

export function isPageCheckoutInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.initiated);
}

export function getShipmentMethodsFromStore(state: IReduxStore, props: IReduxOwnProps): IShipmentMethod[] | null {
    return isShipmentMethodsExist(state, props) ? state.pageCheckout.data.shipments : null;
}

export function isShipmentMethodsExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.data.shipments);
}

export function getPaymentMethodsFromStore(state: IReduxStore, props: IReduxOwnProps): IPaymentMethod[] | null {
    return isPaymentMethodsExist(state, props) ? state.pageCheckout.data.payments : null;
}

export function isPaymentMethodsExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageCheckout.data.payments);
}

export function getAddressesCollectionFromCheckoutStore(state: IReduxStore, props: IReduxOwnProps):
    IAddressItemCollection[] | null {

    return checkAddressesCollectionExist(state, props) ? state.pageCheckout.data.addressesCollection : null;
}

export function checkAddressesCollectionExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props)
        && state.pageCheckout.data.addressesCollection
        && state.pageCheckout.data.addressesCollection.length
    );
}

export function getCreatedOrder(state: IReduxStore, props: IReduxOwnProps): string {
    return isStateExist(state, props) ? state.pageCheckout.data.orderId : '';
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageCheckout.data);
}
