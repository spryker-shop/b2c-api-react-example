import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IAddressItem } from '@interfaces/addresses';

export const isPageAddressesStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageAddresses.pending);

export const isAddressesInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageAddresses.initiated);

export const getCurrentAddress = (state: IReduxStore, props: IReduxOwnProps): IAddressItem =>
    (isStateExist(state, props) && state.pageAddresses.data.currentAddress)
        ? state.pageAddresses.data.currentAddress
        : null;

export const isCurrentAddressPresent = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageAddresses.data && state.pageAddresses.data.currentAddress &&
        state.pageAddresses.data.currentAddress.id);

export const getAddressesCollection = (state: IReduxStore, props: IReduxOwnProps): IAddressItem[] =>
    isStateExist(state, props) ? state.pageAddresses.data.addresses : [];

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.pageAddresses.data);
