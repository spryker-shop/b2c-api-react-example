import { ICartState } from '@stores/reducers/common/cart/types';
import { ICartDataParsed, ICartItem } from '@interfaces/cart';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { initialState } from '@stores/reducers/common/cart';

export const handleUpdateCartFulfilled = (state: ICartState, payload: ICartDataParsed | null): ICartState => ({
    ...state,
    data: {
        ...state.data,
        isCartEmpty: !(payload.items && payload.items.length),
        ...payload
    },
    ...getReducerPartFulfilled()
});

export const handleCartRejected = (state: ICartState, payload: IApiErrorResponse): ICartState => ({
    ...state,
    ...getReducerPartRejected(payload.error)
});

export const handleCartPending = (state: ICartState): ICartState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleCartFulfilled = (state: ICartState, payload: ICartDataParsed): ICartState => ({
    ...state,
    data: {
        ...state.data,
        isCartEmpty: !(payload.items && payload.items.length),
        cartCreated: true,
        ...payload
    },
    ...getReducerPartFulfilled()
});

export const handleCartCreatedFulfilled = (state: ICartState): ICartState => ({
    ...state,
    data: {
        ...initialState.data,
        cartCreated: true
    },
    ...getReducerPartFulfilled()
});

export const handleCartUpdateFulfilledState = (state: ICartState): ICartState => ({
    ...state,
    ...getReducerPartFulfilled()
});

export const handleCartDeleteItemFulfilled = (state: ICartState, payload: { sku: string }): ICartState => {
    const itemsAfterDelete: ICartItem[] = state.data.items.filter((item: ICartItem) => item.sku !== payload.sku);

    return {
        ...state,
        data: {
            ...state.data,
            isCartEmpty: !(itemsAfterDelete && itemsAfterDelete.length),
            items: itemsAfterDelete
        },
        ...getReducerPartFulfilled()
    };
};
