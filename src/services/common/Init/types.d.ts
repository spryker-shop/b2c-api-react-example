import { ICountry } from '@interfaces/addresses';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface IStoreRawResponse {
    data: IStoreDataesponse[];
}

interface IStoreDataesponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IStoreAttributesRawResponse;
}

export interface IStoreAttributesRawResponse {
    countries: ICountry[];
    currencies: IStoreAttributeItem[];
    defaultCurrency: string;
    locales: IStoreAttributeItem[];
    timeZone: string;
}

interface IStoreAttributeItem {
    code: string;
    name: string;
}
