import {
    CART_ADD_ITEM,
    CART_CREATE,
    CART_DELETE_ITEM,
    CART_UPDATE_ITEM,
    GET_CARTS,
    CART_UPDATE_FULLFILLED_STATE
} from '@stores/actionTypes/common/cart';
import { PAGES_CUSTOMER_LOGOUT } from '@stores/actionTypes/pages/login';
import { ICartDataParsed, ICartItem } from '@interfaces/cart';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { ICartAction, ICartState } from './types';
import { IApiErrorResponse } from '@services/types';

export const initialState: ICartState = {
    data: {
        isCartEmpty: true,
        isCartCreated: false,
        currency: null,
        items: [],
        id: null,
        priceMode: null,
        store: null,
        discounts: null,
        totals: null,
        totalQty: 0,
    },
};

export const cart = function (state: ICartState = initialState, action: ICartAction): ICartState {
    switch (action.type) {
        case `${CART_ADD_ITEM}_PENDING`:
        case `${CART_UPDATE_ITEM}_PENDING`:
        case `${CART_CREATE}_PENDING`:
        case `${GET_CARTS}_PENDING`:
            return handlePending(state);
        case `${CART_ADD_ITEM}_FULFILLED`:
        case `${CART_UPDATE_ITEM}_FULFILLED`:
            return handleFulfilled(state, action.payloadCartItemFulfilled);
        case `${CART_ADD_ITEM}_REJECTED`:
        case `${CART_DELETE_ITEM}_REJECTED`:
        case `${CART_UPDATE_ITEM}_REJECTED`:
        case `${GET_CARTS}_REJECTED`:
            return handleRejected(state, action.payloadRejected || {error: action.error});
        case `${CART_CREATE}_FULFILLED`:
        case `${GET_CARTS}_FULFILLED`:
            if (!action.payloadCartItemFulfilled) {
                return {
                    ...state,
                    data: {...initialState.data, isCartCreated: true},
                    ...getReducerPartFulfilled(),
                };
            }

            return handleCartFulfilled(state, action.payloadCartItemFulfilled);
        case `${CART_CREATE}_REJECTED`:
            return handleCartCreateRejected(state, action.payloadRejected);
        case `${CART_DELETE_ITEM}_PENDING`:
            return {
                ...state,
                ...getReducerPartPending(),
            };
        case `${CART_DELETE_ITEM}_REJECTED`:
            return {
                ...state,
                ...getReducerPartRejected(action.payloadRejected.error),
            };
        case `${CART_DELETE_ITEM}_FULFILLED`:
            const itemsAfterDelete: ICartItem[] = state.data.items.filter((
                item: ICartItem
            ) => item.sku !== action.payloadCartDeleteItemFulfilled.sku);

            return {
                ...state,
                data: {
                    ...state.data,
                    isCartEmpty: !(itemsAfterDelete && itemsAfterDelete.length),
                    items: itemsAfterDelete
                },
                ...getReducerPartFulfilled(),
            };
        case PAGES_CUSTOMER_LOGOUT:
            return {
                ...state,
                data: {...initialState.data, isCartCreated: true},
                ...getReducerPartFulfilled(),
            };
        case CART_UPDATE_FULLFILLED_STATE:
            return {
                ...state,
                ...getReducerPartFulfilled(),
            };
        default:
            return state;
    }
};

// handlers
const handleFulfilled = (cartState: ICartState, payload: ICartDataParsed | null) => (
    {
        ...cartState,
        data: {
            ...cartState.data,
            isCartEmpty: !(payload.items && payload.items.length),
            ...payload,
        },
        ...getReducerPartFulfilled(),
    }
);

const handleRejected = (cartState: ICartState, payload: IApiErrorResponse) => (
    {
        ...cartState,
        data: {
            ...cartState.data,
        },
        ...getReducerPartRejected(payload.error),
    }
);

const handlePending = (cartState: ICartState) => (
    {
        ...cartState,
        data: {
            ...cartState.data,
        },
        ...getReducerPartPending(),
    }
);

const handleCartFulfilled = (cartState: ICartState, payload: ICartDataParsed) => (
    {
        ...cartState,
        data: {
            ...cartState.data,
            isCartEmpty: !(payload.items && payload.items.length),
            isCartCreated: true,
            ...payload,
        },
        ...getReducerPartFulfilled(),
    }
);

const handleCartCreateRejected = (cartState: ICartState, payload: IApiErrorResponse) => (
    {
        ...cartState,
        data: {
            ...cartState.data,
            isCartEmpty: true,
            isCartCreated: false,
        },
        ...getReducerPartRejected(payload.error),
    }
);
