import { ICategory } from '@interfaces/category';
import { ICountry } from '@interfaces/country';

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
