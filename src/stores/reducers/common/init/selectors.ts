import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/common';
import { ICountry } from '@interfaces/addresses';
import { APP_LOCALE_DEFAULT } from '@constants/common';

export const isAppInitialized = (state: IReduxStore, props: IReduxOwnProps): boolean => state.init.data.ok;

export const isAppLoading = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    state.init && state.init.pending && state.init.pending === true;

export const isAppStateFulfilled = (state: IReduxStore, props: IReduxOwnProps): boolean =>
    Boolean(state.init && state.init.fulfilled && state.init.fulfilled === true);

export const getAppCurrency = (state: IReduxStore, props: IReduxOwnProps): string | null =>
    isAppInitialized(state, props) ? state.init.data.currency : null;

export const getAppLocale = (state: IReduxStore, props: IReduxOwnProps): string | null =>
    isAppInitialized(state, props) ? state.init.data.locale : APP_LOCALE_DEFAULT;

export const getAppTimeZone = (state: IReduxStore, props: IReduxOwnProps): string | null =>
    isAppInitialized(state, props) ? state.init.data.timeZone : null;

export const getCounties = (state: IReduxStore, props: IReduxOwnProps): ICountry[] =>
    isAppInitialized(state, props) ? state.init.data.countries : null;

export const getCategoriesTree = (state: IReduxStore, props: IReduxOwnProps): ICategory[] =>
    state.init.data.categoriesTree;

export const getAnonymId = (state: IReduxStore, props: IReduxOwnProps): string => state.init.data.anonymId;

export const getIsTouch = (state: IReduxStore, props: IReduxOwnProps): boolean => state.init.data.isTouch;

export const getIsPageLocked = (state: IReduxStore, props: IReduxOwnProps): boolean => state.init.data.isPageLocked;
