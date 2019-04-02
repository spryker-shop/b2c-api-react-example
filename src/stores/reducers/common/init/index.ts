import { CATEGORIES_TREE_REQUEST, INIT_APP_ACTION_TYPE, SWITCH_LOCALE, IS_PAGE_LOCKED } from '@stores/actionTypes/common/init';
import { getReducerPartFulfilled, getReducerPartPending, getReducerPartRejected } from '@stores/reducers/parts';
import { ICartCreatePayload } from '@services/common/Cart/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { IApiErrorResponse } from '@services/types';
import { TAppTimeZone } from '@interfaces/locale';
import { TAppCurrency } from '@interfaces/currency';
import { TAppPriceMode } from '@interfaces/product';
import { TAppStore } from '@interfaces/store';
import { ICategory } from '@interfaces/category';
import { ICountry } from '@interfaces/country';
import { IInitData } from '@interfaces/init';
import { IInitState, IInitAction } from '@stores/reducers/common/init/types';
import { APP_LOCALE_DEFAULT } from '@configs/environment';

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
        isTouch: true,
        isLockedPage: false
    },
};

export const init = function(state: IInitState = initialState,
                             action: IInitAction): IInitState {
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
            return {
                ...state,
                data: {
                    ...state.data,
                    ok: true,
                    categoriesTree: action.payloadCategoriesTreeFulfilled.categories,
                },
                ...getReducerPartFulfilled(),
            };
        case `${SWITCH_LOCALE}_FULFILLED`:
            return {
                ...state,
                data: {
                    ...state.data,
                    locale: action.payloadLocaleFulfilled.locale,
                },
                ...getReducerPartFulfilled(),
            };
        case `${INIT_APP_ACTION_TYPE}_CLEAR`:
            return {
                ...state,
                data: {
                    anonymId: ''
                }
            };

        case `${IS_PAGE_LOCKED}_FULFILLED`:
            return handleIsLockedPageFulfilled(state, action.payloadIsLockedPage);

        default:
            return state;
    }
};

// handlers
const handleIsLockedPageFulfilled = (appState: IInitState, payload: boolean) =>
    ({
        ...appState,
        data: {
            ...appState.data,
            isLockedPage: payload
        },
        ...getReducerPartFulfilled(),
    });

const handleInitAppFulfilled = (appState: IInitState, payload: IInitData) =>
    ({
        ...appState,
        data: {
            ...appState.data,
            ok: true,
            priceMode: payload.priceMode,
            currency: payload.currency,
            store: payload.store,
            locale: payload.locale,
            timeZone: payload.timeZone,
            countries: payload.countries,
            anonymId: payload.anonymId,
            isTouch: payload.isTouch
        },
        ...getReducerPartFulfilled(),
    });

const handleInitAppRejected = (appState: IInitState, payload: IApiErrorResponse) =>
    ({
        ...appState,
        data: {
            ...appState.data,
            ok: false,
        },
        ...getReducerPartRejected(payload.error),
    });
const handleInitAppPending = (appState: IInitState) =>
    ({
        ...appState,
        data: {
            ...appState.data,
        },
        ...getReducerPartPending(),
    });

// selectors

export function isAppInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.init.data.ok);
}

export function isAppLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.init && state.init.pending && state.init.pending === true);
}

export function isAppStateFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.init && state.init.fulfilled && state.init.fulfilled === true);
}

export function getAppCurrency(state: IReduxStore, props: IReduxOwnProps): TAppCurrency {
    return isAppInitiated(state, props) ? state.init.data.currency : null;
}

export function getAppLocale(state: IReduxStore, props: IReduxOwnProps): TAppStore {
    return isAppInitiated(state, props) ? state.init.data.locale : APP_LOCALE_DEFAULT;
}

export function getAppTimeZone(state: IReduxStore, props: IReduxOwnProps): TAppTimeZone {
    return isAppInitiated(state, props) ? state.init.data.timeZone : null;
}

export function getAppPriceMode(state: IReduxStore, props: IReduxOwnProps): TAppPriceMode {
    return isAppInitiated(state, props) ? state.init.data.priceMode : null;
}

export function getAppStore(state: IReduxStore, props: IReduxOwnProps): TAppStore {
    return isAppInitiated(state, props) ? state.init.data.store : null;
}

export function getCounties(state: IReduxStore, props: IReduxOwnProps): ICountry[] {
    return isAppInitiated(state, props) ? state.init.data.countries : null;
}

export function getPayloadForCreateCart(state: IReduxStore, props: IReduxOwnProps): ICartCreatePayload {
    return (
        isAppInitiated(state, props)
            ? {
                priceMode: state.init.data.priceMode,
                currency: state.init.data.currency,
                store: state.init.data.store,
            }
            : null
    );
}

export function getCategoriesTree(state: IReduxStore, props: IReduxOwnProps): ICategory[] {
    return state.init.data.categoriesTree;
}

export function getAnonymId(state: IReduxStore, props: IReduxOwnProps): string {
    return state.init.data.anonymId;
}

export function getIsTouch(state: IReduxStore, props: IReduxOwnProps): boolean {
    return state.init.data.isTouch;
}

export function getIsPageLocked(state: IReduxStore, props: IReduxOwnProps): boolean {
    return state.init.data.isLockedPage;
}
