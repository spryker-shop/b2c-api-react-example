import * as actionTypes from '@stores/actionTypes/common/init';
import * as initHandlers  from '@stores/reducers/common/init/handlers';
import { IInitAction, IInitState } from '@stores/reducers/common/init/types';

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
        isPageLocked: false
    }
};

export const init = (state: IInitState = initialState, action: IInitAction): IInitState => {
    switch (action.type) {
        case `${actionTypes.INIT_APP_ACTION_TYPE}_PENDING`:
        case `${actionTypes.CATEGORIES_TREE_REQUEST}_PENDING`:
        case `${actionTypes.SWITCH_LOCALE}_PENDING`:
            return initHandlers.handleInitAppPending(state);
        case `${actionTypes.INIT_APP_ACTION_TYPE}_FULFILLED`:
            return initHandlers.handleInitAppFulfilled(state, action.payloadInitFulfilled);
        case `${actionTypes.INIT_APP_ACTION_TYPE}_REJECTED`:
        case `${actionTypes.CATEGORIES_TREE_REQUEST}_REJECTED`:
        case `${actionTypes.SWITCH_LOCALE}_REJECTED`:
            return initHandlers.handleInitAppRejected(state, action.payloadRejected);
        case `${actionTypes.CATEGORIES_TREE_REQUEST}_FULFILLED`:
            return initHandlers.handleCategoriesTreeRequestFulfilled(
                state,
                action.payloadCategoriesTreeFulfilled.categories
            );
        case `${actionTypes.SWITCH_LOCALE}_FULFILLED`:
            return initHandlers.handleSwitchLocaleFulfilled(state, action.payloadLocaleFulfilled);
        case `${actionTypes.INIT_APP_ACTION_TYPE}_CLEAR`:
            return initHandlers.handleInitAppClear(state);
        case `${actionTypes.ANONYM_ID}_FULFILLED`:
            return initHandlers.handleAnonymIdFulfilled(state, action.payloadAnonymIdFulfilled);
        case `${actionTypes.IS_PAGE_LOCKED}_FULFILLED`:
            return initHandlers.handleisPageLockedFulfilled(state, action.payloadisPageLocked);
        default:
            return state;
    }
};
