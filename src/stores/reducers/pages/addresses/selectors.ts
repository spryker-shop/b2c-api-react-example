import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItem } from '@interfaces/addresses';

export function isPageAddressesStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageAddresses.pending);
}

export function isAddressesStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageAddresses.rejected);
}

export function isAddressesInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.pageAddresses.initiated);
}

export function getCurrentAddress(state: IReduxStore, props: IReduxOwnProps): IAddressItem | null {
    return (isStateExist(state, props) && state.pageAddresses.data.currentAddress)
        ? state.pageAddresses.data.currentAddress
        : null;
}

export function isCurrentAddressPresent(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(
        isStateExist(state, props)
        && state.pageAddresses.data
        && state.pageAddresses.data.currentAddress
        && state.pageAddresses.data.currentAddress.id
    );
}

export function getAddressesCollection(state: IReduxStore, props: IReduxOwnProps): IAddressItem[] {
    return isStateExist(state, props)
        ? state.pageAddresses.data.addresses
        : [];
}

export const checkAddressesCollectionExist = (state: IReduxStore, props: IReduxOwnProps): boolean => (
    Boolean(isStateExist(state, props)
        && state.pageAddresses.data.addresses
        && state.pageAddresses.data.addresses.length
    )
);

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.pageAddresses.data);
}
