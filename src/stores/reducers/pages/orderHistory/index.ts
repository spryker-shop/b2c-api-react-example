import * as actionTypes from '@stores/actionTypes/pages/order';
import * as orderHistoryHandlers  from '@stores/reducers/pages/orderHistory/handlers';
import { IOrderHistoryState, IPageOrderHistoryAction } from '@stores/reducers/pages/orderHistory/types';

export const initialState: IOrderHistoryState = {
    data: {
        items: null
    }
};

export const orderHistory = (
    state: IOrderHistoryState = initialState,
    action: IPageOrderHistoryAction
): IOrderHistoryState => {
    switch (action.type) {
        case `${actionTypes.ORDERS_COLLECTION_REQUEST}_PENDING`:
            return orderHistoryHandlers.handlePending(state);
        case `${actionTypes.ORDERS_COLLECTION_REQUEST}_FULFILLED`:
            return orderHistoryHandlers.handleFulfilled(state, action.payloadFulfilled);
        case `${actionTypes.ORDERS_COLLECTION_REQUEST}_REJECTED`:
            return orderHistoryHandlers.handleRejected(state, action.payloadRejected);
        case actionTypes.CLEAR_ORDERS_COLLECTION : {
            return initialState;
        }
        default:
            return state;
    }
};
