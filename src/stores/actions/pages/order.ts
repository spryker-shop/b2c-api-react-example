import * as actionTypes from '@stores/actionTypes/pages/order';
import { OrderService } from '@services/pages/Order';
import { IOrderCollectionParsed, IOrderDetailsParsed } from '@interfaces/order';
import { IPageOrderHistoryAction } from '@stores/reducers/pages/orderHistory/types';
import { IPageOrderDetailsAction } from '@stores/reducers/pages/orderDetails/types';

export const ordersCollectionPendingStateAction = (): IPageOrderHistoryAction => ({
    type: actionTypes.ORDERS_COLLECTION_REQUEST + '_PENDING'
});

export const ordersCollectionRejectedStateAction = (message: string): IPageOrderHistoryAction => ({
    type: actionTypes.ORDERS_COLLECTION_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const ordersCollectionFulfilledStateAction = (payload: IOrderCollectionParsed): IPageOrderHistoryAction => ({
    type: actionTypes.ORDERS_COLLECTION_REQUEST + '_FULFILLED',
    payloadFulfilled: payload
});

export const getOrdersCollectionAction = (): Function => (dispatch: Function, getState: Function): void => {
    OrderService.getOrdersCollection(dispatch);
};

export const clearOrdersCollectionAction = (): IPageOrderHistoryAction => ({
    type: actionTypes.CLEAR_ORDERS_COLLECTION
});

export const orderDetailsPendingStateAction = (): IPageOrderDetailsAction => ({
    type: actionTypes.ORDER_DETAILS_REQUEST + '_PENDING'
});

export const orderDetailsRejectedStateAction = (message: string): IPageOrderDetailsAction => ({
    type: actionTypes.ORDER_DETAILS_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const orderDetailsFulfilledStateAction = (payload: IOrderDetailsParsed): IPageOrderDetailsAction => ({
    type: actionTypes.ORDER_DETAILS_REQUEST + '_FULFILLED',
    payloadFulfilled: payload
});

export const getOrderDetailsAction = (orderId: string): Function => (dispatch: Function, getState: Function): void => {
    OrderService.getOrderDetails(dispatch, orderId);
};
