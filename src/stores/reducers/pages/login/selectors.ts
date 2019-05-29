import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';

export const isUserAuthenticated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    state.pagesLogin && state.pagesLogin.data && state.pagesLogin.data.isAuth;

export const getCustomerReference = (state: IReduxStore, props: IReduxOwnProps): string =>
    isUserAuthenticated(state, props) && state.pagesLogin.data.customerRef
        ? state.pagesLogin.data.customerRef
        : null;

export const isPageLoginStateLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    state.pagesLogin && state.pagesLogin.pending && state.pagesLogin.pending === true;
