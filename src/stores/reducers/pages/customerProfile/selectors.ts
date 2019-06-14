import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICustomerDataParsed } from '@interfaces/customer';

export const isCustomerProfilePresent = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCustomerProfile.data.profile &&
        state.pageCustomerProfile.data.profile.id);

export const isPageCustomerProfileLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCustomerProfile.pending &&
        state.pageCustomerProfile.pending === true);

export const isPageCustomerProfileRejected = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCustomerProfile.rejected &&
        state.pageCustomerProfile.rejected === true);

export const isPageCustomerProfileFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.pageCustomerProfile.fulfilled &&
        state.pageCustomerProfile.fulfilled === true);

export const getCustomerProfile = (state: IReduxStore, props: IReduxOwnProps): ICustomerDataParsed =>
    !isCustomerProfilePresent(state, props) ? null : state.pageCustomerProfile.data.profile;

export const isCustomerPasswordUpdated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    isStateExist(state, props) ? state.pageCustomerProfile.data.isPasswordUpdated : null;

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.pageCustomerProfile);
