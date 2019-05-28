import { IInitState, ILocaleActionPayload } from '@stores/reducers/common/init/types';
import { IInitData } from '@interfaces/init';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IApiErrorResponse } from '@services/types';
import { ICategory } from '@interfaces/common';

export const handleInitAppFulfilled = (state: IInitState, payload: IInitData): IInitState => ({
    ...state,
    data: {
        ...state.data,
        ok: true,
        priceMode: payload.priceMode,
        currency: payload.currency,
        store: payload.store,
        locale: payload.locale,
        timeZone: payload.timeZone,
        countries: payload.countries,
        isTouch: payload.isTouch
    },
    ...getReducerPartFulfilled()
});

export const handleInitAppRejected = (state: IInitState, payload: IApiErrorResponse): IInitState => ({
    ...state,
    data: {
        ...state.data,
        ok: false
    },
    ...getReducerPartRejected(payload.error)
});

export const handleInitAppPending = (state: IInitState): IInitState => ({
    ...state,
    ...getReducerPartPending()
});

export const handleCategoriesTreeRequestFulfilled = (state: IInitState, categories: ICategory[]): IInitState => ({
    ...state,
    data: {
        ...state.data,
        ok: true,
        categoriesTree: categories
    },
    ...getReducerPartFulfilled()
});

export const handleSwitchLocaleFulfilled = (state: IInitState, payload: ILocaleActionPayload): IInitState => ({
    ...state,
    data: {
        ...state.data,
        locale: payload.locale
    },
    ...getReducerPartFulfilled()
});

export const handleInitAppClear = (state: IInitState): IInitState => ({
    ...state,
    data: {
        anonymId: ''
    }
});

export const handleisPageLockedFulfilled = (state: IInitState, payload: boolean): IInitState => ({
    ...state,
    data: {
        ...state.data,
        isPageLocked: payload
    },
    ...getReducerPartFulfilled()
});

export const handleAnonymIdFulfilled = (state: IInitState, payload: string): IInitState => ({
    ...state,
    data: {
        ...state.data,
        anonymId: payload
    }
});
