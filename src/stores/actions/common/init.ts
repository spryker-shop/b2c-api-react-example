import * as actionTypes from '@stores/actionTypes/common/init';
import { InitAppService } from '@services/common/Init';
import { ICategory } from '@interfaces/common';
import { IInitData } from '@interfaces/init';
import { ICustomerLoginDataParsed } from '@interfaces/customer';
import { ILocaleActionPayload, IInitAction } from '@stores/reducers/common/Init/types';

export const initApplicationDataPendingStateAction = () => ({
    type: actionTypes.INIT_APP_ACTION_TYPE + '_PENDING'
});

export const initApplicationDataRejectedStateAction = (message: string) => ({
    type: actionTypes.INIT_APP_ACTION_TYPE + '_REJECTED',
    payloadRejected: { error: message }
});

export const initApplicationDataFulfilledStateAction = (payload: IInitData) => ({
    type: actionTypes.INIT_APP_ACTION_TYPE + '_FULFILLED',
    payloadInitFulfilled: payload
});

export const initApplicationDataAction = () => (dispatch: Function, getState: Function) => {
    InitAppService.getInitData(dispatch);
};

export const categoriesPendingState = () => ({
    type: actionTypes.CATEGORIES_TREE_REQUEST + '_PENDING'
});

export const categoriesRejectedState = (message: string) => ({
    type: actionTypes.CATEGORIES_TREE_REQUEST + '_REJECTED',
    payloadRejected: { error: message }
});

export const categoriesFulfilledState = (categories: ICategory[]) => ({
    type: actionTypes.CATEGORIES_TREE_REQUEST + '_FULFILLED',
    payloadCategoriesTreeFulfilled: { categories }
});

export const getCategoriesAction = () => (dispatch: Function, getState: Function) => {
    InitAppService.getCategoriesTree(dispatch);
};

export const switchLocalePendingState = () => ({
    type: actionTypes.SWITCH_LOCALE + '_PENDING'
});

export const switchLocaleRejectedState = (message: string) => ({
    type: actionTypes.SWITCH_LOCALE + '_REJECTED',
    payloadRejected: { error: message }
});

export const switchLocaleFulfilledState = (payload: ILocaleActionPayload): IInitAction => ({
    type: actionTypes.SWITCH_LOCALE + '_FULFILLED',
    payloadLocaleFulfilled: payload
});

export const switchLocaleAction = (payload: any) => (dispatch: Function, getState: Function) => {
    InitAppService.switchLocale(dispatch, payload);
};

export const setAuthFromStorageAction = (payload: ICustomerLoginDataParsed) => ({
    type: actionTypes.SET_AUTH_FROM_STORAGE + '_FULFILLED',
    payloadAuthFulfilled: payload
});

export const anonymIdFilFilled = (payload: string) => ({
    type: actionTypes.ANONYM_ID + '_FULFILLED',
    payloadAnonymIdFulfilled: payload
});

export const isPageLockedFulfilledState = (payload: boolean): IInitAction => ({
    type: actionTypes.IS_PAGE_LOCKED + '_FULFILLED',
    payloadisPageLocked: payload
});
