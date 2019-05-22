import { PRICE_MODE_DEFAULT } from '@constants/common';
import api from '@services/api';
import { IStoreRawResponse } from './types';
import { IInitData } from '@interfaces/init';

export const parseStoreResponse = (data: IStoreRawResponse): IInitData => {
    const result: IInitData = {
        priceMode: null,
        currency: null,
        store: null,
        locale: null,
        timeZone: null
    };

    if (!data.data[0].attributes) {
        return result;
    }

    const attributes = data.data[0].attributes;

    result.store = data.data[0].id;
    result.currency = attributes.defaultCurrency;
    result.priceMode = PRICE_MODE_DEFAULT;
    result.timeZone = attributes.timeZone;
    result.countries = attributes.countries;

    attributes.locales.forEach(row => row.code === result.store.toLowerCase() ? result.locale = row.code : 'de');

    const savedLocale = localStorage.getItem('locale');
    const currentLocale = !!savedLocale ? savedLocale : attributes.locales[0].code;

    result.locale = currentLocale;
    api.setHeader('Accept-Language', currentLocale);

    return result;
};
