import { ICountry } from '@interfaces/addresses';

interface IStoreAttributeItem {
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
    currencies: IStoreAttributeItem[];
    defaultCurrency: string;
    locales: IStoreAttributeItem[];
    timeZone: string;
}
