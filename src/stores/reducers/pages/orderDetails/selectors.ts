import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IOrderDetailsParsed } from '@interfaces/order';

export const getOrderDetailsFromStore = (state: IReduxStore, props: IReduxOwnProps): IOrderDetailsParsed =>
    isOrderDetailsPresent(state, props) ? state.orderDetails.data : null;

export const isOrderDetailsPresent = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderDetails.data.id);

export const isOrderDetailsStateRejected = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderDetails.rejected && state.orderDetails.rejected === true);

export const isOrderDetailsLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderDetails.pending && state.orderDetails.pending === true);

export const isOrderDetailsFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderDetails.fulfilled && state.orderDetails.fulfilled === true);

export const isOrderDetailsInitiated = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(isStateExist(state, props) && state.orderDetails.initiated && state.orderDetails.initiated === true);

const isStateExist = (state: IReduxStore, props: IReduxOwnProps): boolean => Boolean(state.orderDetails);
