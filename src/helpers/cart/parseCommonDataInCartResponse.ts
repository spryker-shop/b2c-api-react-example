import { ICustomerCartDataRawResponse } from '@helpers/cart/types';
import { ICommonDataInCart } from '@interfaces/cart';

export const parseCommonDataInCartResponse = (data: ICustomerCartDataRawResponse): ICommonDataInCart => (
    {
        id: data.id,
        currency: data.attributes.currency,
        discounts: data.attributes.discounts,
        priceMode: data.attributes.priceMode,
        store: data.attributes.store,
        totals: data.attributes.totals,
    }
);
