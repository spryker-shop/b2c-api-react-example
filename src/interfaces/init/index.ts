import { TAppPriceMode } from '@interfaces/product';
import { TAppCurrency } from '@interfaces/currency';
import { TAppStore } from '@interfaces/store';
import { TAppLocale, TAppTimeZone } from '@interfaces/locale';
import { ICategory } from '@interfaces/category';
import { ICountry } from '@interfaces/country';

export interface IInitData {
    ok?: boolean;
    priceMode?: TAppPriceMode;
    currency?: TAppCurrency;
    store?: TAppStore;
    locale?: TAppLocale;
    timeZone?: TAppTimeZone;
    categoriesTree?: ICategory[];
    countries?: ICountry[];
    anonymId?: string;
    isTouch?: boolean;
    isPageLocked?: boolean;
}
