import { ICurrencyItem } from '@interfaces/currency';
import { ILocaleItem } from '@interfaces/locale';
import { ICountry } from '@interfaces/country';

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
