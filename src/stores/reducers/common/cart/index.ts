import * as actionTypes from '@stores/actionTypes/common/cart';
import * as cartHandlers  from '@stores/reducers/common/cart/handlers';
import { PAGES_CUSTOMER_LOGOUT } from '@stores/actionTypes/pages/login';
import { ICartAction, ICartState } from '@stores/reducers/common/cart/types';

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
        totalQty: 0
    }
};

export const cart = (state: ICartState = initialState, action: ICartAction): ICartState => {
    switch (action.type) {
        case `${actionTypes.CART_ADD_ITEM}_PENDING`:
        case `${actionTypes.CART_UPDATE_ITEM}_PENDING`:
        case `${actionTypes.GET_CARTS}_PENDING`:
            return cartHandlers.handleCartPending(state);
        case `${actionTypes.CART_ADD_ITEM}_FULFILLED`:
        case `${actionTypes.CART_UPDATE_ITEM}_FULFILLED`:
            return cartHandlers.handleUpdateCartFulfilled(state, action.payloadCartItemFulfilled);
        case `${actionTypes.CART_ADD_ITEM}_REJECTED`:
        case `${actionTypes.CART_DELETE_ITEM}_REJECTED`:
        case `${actionTypes.CART_UPDATE_ITEM}_REJECTED`:
        case `${actionTypes.GET_CARTS}_REJECTED`:
            return cartHandlers.handleCartRejected(state, action.payloadRejected);
        case `${actionTypes.GET_CARTS}_FULFILLED`:
            if (!action.payloadCartItemFulfilled) {
                return cartHandlers.handleCartCreatedFulfilled(state);
            }

            return cartHandlers.handleCartFulfilled(state, action.payloadCartItemFulfilled);
        case `${actionTypes.CART_DELETE_ITEM}_FULFILLED`:
            return cartHandlers.handleCartDeleteItemFulfilled(state, action.payloadCartDeleteItemFulfilled);
        case PAGES_CUSTOMER_LOGOUT:
            return cartHandlers.handleCartCreatedFulfilled(state);
        case actionTypes.CART_UPDATE_FULLFILLED_STATE:
            return cartHandlers.handleCartUpdateFulfilledState(state);
        default:
            return state;
    }
};
