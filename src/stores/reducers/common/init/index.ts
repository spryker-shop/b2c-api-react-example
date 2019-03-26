import { IInitAction, IInitState, ILocaleActionPayload } from '@stores/reducers/common/init/types';
import {
    ANONYM_ID,
    CATEGORIES_TREE_REQUEST,
    INIT_APP_ACTION_TYPE,
    SWITCH_LOCALE
} from '@stores/actionTypes/common/init';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { IInitData } from '@interfaces/init';
import { IApiErrorResponse } from '@services/types';
import { ICategory } from '@interfaces/category';

export const initialState: IInitState = {
    data: {
        ok: false,
        priceMode: null,
        currency: null,
        store: null,
        locale: null,
        timeZone: null,
        categoriesTree: [],
        countries: [],
        anonymId: 'anonym',
    },
};

export const init = function(state: IInitState = initialState, action: IInitAction): IInitState {
    switch (action.type) {
        case `${INIT_APP_ACTION_TYPE}_PENDING`:
        case `${CATEGORIES_TREE_REQUEST}_PENDING`:
        case `${SWITCH_LOCALE}_PENDING`:
            return handleInitAppPending(state);
        case `${INIT_APP_ACTION_TYPE}_FULFILLED`:
            return handleInitAppFulfilled(state, action.payloadInitFulfilled);
        case `${INIT_APP_ACTION_TYPE}_REJECTED`:
        case `${CATEGORIES_TREE_REQUEST}_REJECTED`:
        case `${SWITCH_LOCALE}_REJECTED`:
            return handleInitAppRejected(state, action.payloadRejected || {error: action.error});
        case `${CATEGORIES_TREE_REQUEST}_FULFILLED`:
            return handleCategoriesTreeRequestFulfilled(state, action.payloadCategoriesTreeFulfilled);
        case `${SWITCH_LOCALE}_FULFILLED`:
            return handleSwitchLocaleFulfilled(state, action.payloadLocaleFulfilled);
        case `${INIT_APP_ACTION_TYPE}_CLEAR`:
            return handleInitAppClear(state);
        case `${ANONYM_ID}_FULFILLED`:
            return handleAnonymIdFulfilled(state, action.payloadAnonymIdFulfilled);
        default:
            return state;
    }
};

const handleInitAppFulfilled = (appState: IInitState, payload: IInitData) => ({
    ...appState,
    data: {
        ...appState.data,
        ok: true,
        priceMode: payload.priceMode,
        currency: payload.currency,
        store: payload.store,
        locale: payload.locale,
        timeZone: payload.timeZone,
        countries: payload.countries
    },
    ...getReducerPartFulfilled(),
});

const handleInitAppRejected = (appState: IInitState, payload: IApiErrorResponse) => ({
    ...appState,
    data: {
        ...appState.data,
        ok: false,
    },
    ...getReducerPartRejected(payload.error),
});

const handleInitAppPending = (appState: IInitState) => ({
    ...appState,
    data: {
        ...appState.data,
    },
    ...getReducerPartPending(),
});

const handleCategoriesTreeRequestFulfilled = (appState: IInitState, payload: {categories: ICategory[]}) => ({
    ...appState,
    data: {
        ...appState.data,
        ok: true,
        categoriesTree: payload.categories,
    },
    ...getReducerPartFulfilled()
});

const handleSwitchLocaleFulfilled = (appState: IInitState, payload: ILocaleActionPayload) => ({
    ...appState,
    data: {
        ...appState.data,
        locale: payload.locale,
    },
    ...getReducerPartFulfilled(),
});

const handleInitAppClear = (appState: IInitState) => ({
    ...appState,
    data: {
        anonymId: ''
    }
});

const handleAnonymIdFulfilled = (appState: IInitState, payload: string) => ({
    ...appState,
    data: {
        ...appState.data,
        anonymId: payload
    }
});
