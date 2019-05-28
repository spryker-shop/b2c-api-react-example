import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IOrderItem } from '@interfaces/order';

export const getOrdersCollectionFromStore = (state: IReduxStore, props: IReduxOwnProps): IOrderItem[] | null =>
    isOrderHistoryItems(state, props) ? state.orderHistory.data.items : null;

export const isOrderHistoryItems = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderHistory.data.items);

export const isOrderHistoryLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderHistory.pending && state.orderHistory.pending === true);

export const isOrderHistoryFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderHistory.fulfilled && state.orderHistory.fulfilled === true);

export const isOrderHistoryInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderHistory.initiated && state.orderHistory.initiated === true);

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.orderHistory);
