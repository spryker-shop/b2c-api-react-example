export interface ICartCreatePayload {
    priceMode: string;
    currency: string;
    store: string;
}

import { ICartDiscounts, ICartItem, ICartItemCalculation } from '@interfaces/cart';
import { IAbstractRowIncludedResponse } from '@services/types';
import {
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse
} from '@services/pages/Product/types';
import { ITotals } from '@interfaces/common';

export interface IUserCartRawResponseMultiValue {
    data: ICustomerCartDataRawResponse[];
    included?: [TRowCustomerCartIncludedResponse];
}

export interface IUserCartRawResponseOneValue {
    data: ICustomerCartDataRawResponse;
    included?: [TRowCustomerCartIncludedResponse];
}

export interface IUserCartRawResponse extends IUserCartRawResponseOneValue {
}

export interface ICustomerCartDataRawResponse {
    attributes: {
        currency: string;
        discounts: {} | ICartDiscounts[];
        priceMode: string;
        store: string;
        totals: ITotals;
    };
    id: string;
    links: {
        self: string;
    };
    relationships: {
        items: {
            data: ICartItemDataShort[];
        };
        'guest-cart-items': {
            data: ICartItemDataShort[];
        }
    };
    type: string;
}

export interface ICartResultData {
    [key: string]: ICartItem;
}

export interface ICartItemDataShort {
    type: string;
    id: string;
}

export type TRowCustomerCartIncludedResponse = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse
    | IRowCustomerCartItemsIncludedResponse;

export interface IRowCustomerCartItemsIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'items' | 'guest-cart-items';
    attributes: {
        amount: number | null;
        calculations: ICartItemCalculation;
        groupKey: string;
        quantity: number;
        sku: string
        abstractSku: string
    };
}
