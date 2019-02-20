import { WithRouter, IComponent } from '@interfaces/common';
import { TAppLocale } from '@interfaces/locale';

interface IPageContentProps extends IComponent, WithRouter {
    dispatch: Function;
    isLoading: boolean;
    locale: TAppLocale;
    initApplicationData: Function;
    setAuth: Function;
    getCustomerCart: Function;
    getGuestCart: Function;
    isAppDataSet: boolean;
    isCustomerAuth: boolean;
    anonymId: string;
    cartCreated: boolean;
    isInitStateFulfilled: boolean;
    clearSearchTerm: () => void;
}

interface IPageContentState {
    mobileNavOpened: boolean;
}
