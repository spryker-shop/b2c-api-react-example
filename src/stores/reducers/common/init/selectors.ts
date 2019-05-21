import { ICartCreatePayload } from '@services/common/Cart/types';
import { IReduxOwnProps, IReduxStore } from '@stores/reducers/types';
import { ICategory } from '@interfaces/category';
import { ICountry } from '@interfaces/country';
import { APP_LOCALE_DEFAULT } from '@constants/common';

export function isAppInitiated(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.init.data.ok);
}

export function isAppLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return (state.init && state.init.pending && state.init.pending === true);
}

export function isAppStateFulfilled(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(state.init && state.init.fulfilled && state.init.fulfilled === true);
}

export function getAppCurrency(state: IReduxStore, props: IReduxOwnProps): string | null {
    return isAppInitiated(state, props) ? state.init.data.currency : null;
}

export function getAppLocale(state: IReduxStore, props: IReduxOwnProps): string | null {
    return isAppInitiated(state, props) ? state.init.data.locale : APP_LOCALE_DEFAULT;
}

export function getAppTimeZone(state: IReduxStore, props: IReduxOwnProps): string | null {
    return isAppInitiated(state, props) ? state.init.data.timeZone : null;
}

export function getAppPriceMode(state: IReduxStore, props: IReduxOwnProps): string | null {
    return isAppInitiated(state, props) ? state.init.data.priceMode : null;
}

export function getAppStore(state: IReduxStore, props: IReduxOwnProps): string | null {
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
    return state.init.data.isPageLocked;
}
