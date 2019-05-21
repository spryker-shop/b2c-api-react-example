import { ILocaleItem } from '@interfaces/locale';
import { ICountry } from '@interfaces/country';

interface ICurrencyItem {
    code: string;
    name: string;
}

export interface IStoreRawResponse {
    data: [{
        attributes: IStoreAttributesRawResponse;
        id: string;
        links: {
            self: string;
        };
        type: string;
    }];
    links: {
        self: string;
    };
}

export interface IStoreAttributesRawResponse {
    countries: ICountry[];
    currencies: ICurrencyItem[];
    defaultCurrency: string;
    locales: ILocaleItem[];
    timeZone: string;
}
