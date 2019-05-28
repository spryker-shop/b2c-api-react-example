import * as actionTypes from '@stores/actionTypes/pages/order';
import * as orderDetailsHandlers  from '@stores/reducers/pages/orderDetails/handlers';
import { IOrderDetailsState, IPageOrderDetailsAction } from '@stores/reducers/pages/orderDetails/types';

export const initialState: IOrderDetailsState = {
    data: {
        id: null,
        dateCreated: null,
        currency: null,
        totals: null,
        expenses: null,
        items: null,
        billingAddress: null,
        shippingAddress: null,
        priceMode: null
    }
};

export const orderDetails = (
    state: IOrderDetailsState = initialState,
    action: IPageOrderDetailsAction
): IOrderDetailsState => {
    switch (action.type) {
        case `${actionTypes.ORDER_DETAILS_REQUEST}_PENDING`:
            return orderDetailsHandlers.handlePending(state);
        case `${actionTypes.ORDER_DETAILS_REQUEST}_FULFILLED`:
            return orderDetailsHandlers.handleFulfilled(state, action.payloadFulfilled);
        case `${actionTypes.ORDER_DETAILS_REQUEST}_REJECTED`:
            return orderDetailsHandlers.handleRejected(state, action.payloadRejected);
        default:
            return state;
    }
};
