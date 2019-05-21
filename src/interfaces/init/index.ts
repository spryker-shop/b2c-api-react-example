import { ICategory } from '@interfaces/common';
import { ICountry } from '@interfaces/addresses';

export interface IInitData {
    ok?: boolean;
    priceMode?: string | null;
    currency?: string | null;
    store?: string | null;
    locale?: string | null;
    timeZone?: string | null;
    categoriesTree?: ICategory[];
    countries?: ICountry[];
    anonymId?: string;
    isTouch?: boolean;
    isPageLocked?: boolean;
}
