import {
    CATEGORIES_TREE_REQUEST,
    INIT_APP_ACTION_TYPE,
    SET_AUTH_FROM_STORAGE,
    SWITCH_LOCALE,
    IS_LOCKED_PAGE
} from '@stores/actionTypes/common/init';
import { InitAppService } from '@services/common/Init';
import { ICategory } from '@interfaces/category';
import { IInitData } from '@interfaces/init';
import { ICustomerLoginDataParsed } from '@interfaces/customer';
import { ILocaleActionPayload, IInitAction } from '@stores/reducers/common/Init/types';

export interface IInitApplicationDataPayload {}

export const initApplicationDataPendingStateAction = () => ({
    type: INIT_APP_ACTION_TYPE + '_PENDING',
});

export const initApplicationDataRejectedStateAction = (message: string) => ({
    type: INIT_APP_ACTION_TYPE + '_REJECTED',
    payloadRejected: {error: message},
});

export const initApplicationDataFulfilledStateAction = (payload: IInitData) => ({
    type: INIT_APP_ACTION_TYPE + '_FULFILLED',
    payloadInitFulfilled: payload,
});

export const categoriesPendingState = () => ({
    type: CATEGORIES_TREE_REQUEST + '_PENDING',
});

export const categoriesRejectedState = (message: string) => ({
    type: CATEGORIES_TREE_REQUEST + '_REJECTED',
    payloadRejected: {error: message},
});

export const categoriesFulfilledState = (categories: ICategory[]) => ({
    type: CATEGORIES_TREE_REQUEST + '_FULFILLED',
    payloadCategoriesTreeFulfilled: {categories},
});

export const switchLocalePendingState = () => ({
    type: SWITCH_LOCALE + '_PENDING',
});

export const switchLocaleRejectedState = (message: string) => ({
    type: SWITCH_LOCALE + '_REJECTED',
    payloadRejected: {error: message},
});

export const switchLocaleFulfilledState = (payload: ILocaleActionPayload): IInitAction => ({
    type: SWITCH_LOCALE + '_FULFILLED',
    payloadLocaleFulfilled: payload,
});

export const switchLocaleAction = function(payload: any) {
    return (dispatch: Function, getState: Function) => {
        InitAppService.switchLocale(dispatch, payload);
    };
};

export const initApplicationDataAction = function(payload: IInitApplicationDataPayload) {
    return (dispatch: Function, getState: Function) => {
        InitAppService.getInitData(dispatch, payload);
    };
};

export const setAuthFromStorageAction = (payload: ICustomerLoginDataParsed) => ({
    type: SET_AUTH_FROM_STORAGE + '_FULFILLED',
    payloadAuthFulfilled: payload,
});

export const getCategoriesAction = function () {
    return (dispatch: Function, getState: Function) => {
        InitAppService.getCategoriesTree(dispatch);
    };
};

export const isLockedPageFulfilledState = (payload: boolean): IInitAction => ({
    type: IS_LOCKED_PAGE + '_FULFILLED',
    payloadIsLockedPage: payload,
});
