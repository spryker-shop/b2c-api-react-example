import { ORDER_DETAILS_REQUEST } from '@stores/actionTypes/pages/order';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IOrderDetailsParsed } from '@interfaces/order';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import {
    IOrderDetailsState,
    IPageOrderDetailsAction,
} from '@stores/reducers/pages/orderDetails/types';
import { IApiErrorResponse } from '@services/types';

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
        priceMode: null,
    },
};

export const orderDetails = function (
    state: IOrderDetailsState = initialState,
    action: IPageOrderDetailsAction
): IOrderDetailsState {
    switch (action.type) {
        case `${ORDER_DETAILS_REQUEST}_PENDING`:
            return handlePending(state);
        case `${ORDER_DETAILS_REQUEST}_FULFILLED`:
            return handleFulfilled(state, action.payloadFulfilled);
        case `${ORDER_DETAILS_REQUEST}_REJECTED`:
            return handleRejected(state, action.payloadRejected || {error: action.error});
        default:
            return state;
    }
};

// handlers
const handleFulfilled = (orderDetailsState: IOrderDetailsState, payload: IOrderDetailsParsed | null) => (
    {
        ...orderDetailsState,
        data: {
            ...orderDetailsState.data,
            ...payload,
        },
        ...getReducerPartFulfilled(),
    }
);

const handleRejected = (orderDetailsState: IOrderDetailsState, payload: IApiErrorResponse) => (
    {
        ...orderDetailsState,
        data: {
            ...orderDetailsState.data,
        },
        ...getReducerPartRejected(payload.error),
    }
);

const handlePending = (orderDetailsState: IOrderDetailsState) => (
    {
        ...orderDetailsState,
        data: {
            ...orderDetailsState.data,
        },
        ...getReducerPartPending(),
    }
);

// selectors
export function getOrderDetailsFromStore(state: IReduxStore, props: IReduxOwnProps): IOrderDetailsParsed {
    return isOrderDetailsPresent(state, props) ? state.orderDetails.data : null;
}

export function isOrderDetailsPresent(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.orderDetails.data.id);
}

export function isOrderDetailsStateRejected(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.orderDetails.rejected && state.orderDetails.rejected === true);
}

export function isOrderDetailsLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.orderDetails.pending && state.orderDetails.pending === true);
}

export function isOrderDetailsFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.orderDetails.fulfilled && state.orderDetails.fulfilled === true);
}

export function isOrderDetailsInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(isStateExist(state, props) && state.orderDetails.initiated && state.orderDetails.initiated === true);
}

function isStateExist(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.orderDetails);
}
