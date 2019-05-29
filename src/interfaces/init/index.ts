import { ICategory } from '@interfaces/common';
import { ICountry } from '@interfaces/addresses';

export interface IInitData {
    ok?: boolean;
    priceMode?: string;
    currency?: string;
    store?: string;
    locale?: string;
    timeZone?: string;
    categoriesTree?: ICategory[];
    countries?: ICountry[];
    anonymId?: string;
    isTouch?: boolean;
    isPageLocked?: boolean;
}
