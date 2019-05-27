import { IReduxState } from '@stores/reducers/types';

export const getReducerPartFulfilled = (): IReduxState => ({
    error: null,
    pending: false,
    fulfilled: true,
    rejected: false,
    initiated: true
});

export const getReducerPartPending = (): IReduxState => ({
    error: null,
    pending: true,
    fulfilled: false,
    rejected: false,
    initiated: false
});

export const getReducerPartRejected = (errorMessage: string): IReduxState => ({
    error: errorMessage,
    pending: false,
    fulfilled: false,
    rejected: true,
    initiated: false
});
