import { ORDER_DETAILS_REQUEST, ORDERS_COLLECTION_REQUEST } from '@stores/actionTypes/pages/order';
import { OrderService } from '@services/pages/Order';
import { IOrderCollectionParsed, IOrderDetailsParsed } from '@interfaces/order';
import { IPageOrderHistoryAction } from '@stores/reducers/pages/orderHistory/types';
import { IPageOrderDetailsAction } from '@stores/reducers/pages/orderDetails/types';

/**
 *  Order History
 */

export const ordersCollectionPendingStateAction = () => ({
    type: ORDERS_COLLECTION_REQUEST + '_PENDING',
});

export const ordersCollectionRejectedStateAction = (message: string): IPageOrderHistoryAction => ({
    type: ORDERS_COLLECTION_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const ordersCollectionFulfilledStateAction = (payload: IOrderCollectionParsed): IPageOrderHistoryAction => ({
    type: ORDERS_COLLECTION_REQUEST + '_FULFILLED',
    payloadFulfilled: payload,
});

export const getOrdersCollectionAction = function () {
    return (dispatch: Function, getState: Function) => {
        OrderService.getOrdersCollection(dispatch);
    };
};

/**
 *  Order Detail
 */

export const orderDetailsPendingStateAction = (): IPageOrderDetailsAction => ({
    type: ORDER_DETAILS_REQUEST + '_PENDING',
});

export const orderDetailsRejectedStateAction = (message: string): IPageOrderDetailsAction => ({
    type: ORDER_DETAILS_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const orderDetailsFulfilledStateAction = (payload: IOrderDetailsParsed): IPageOrderDetailsAction => ({
    type: ORDER_DETAILS_REQUEST + '_FULFILLED',
    payloadFulfilled: payload,
});

export const getOrderDetailsAction = function (orderId: string) {
    return (dispatch: Function, getState: Function) => {
        OrderService.getOrderDetails(dispatch, orderId);
    };
};
