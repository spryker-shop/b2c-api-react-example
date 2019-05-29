import { ICartDiscounts, ICartItemCalculation } from '@interfaces/cart';
import {
    IAbstractRowIncludedResponse,
    IRelationshipsResponse,
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse, EIncludeTypes
} from '@services/types';
import { ITotals } from '@interfaces/common';

export interface ICartRawResponse {
    data: ICartDataResponse;
    included: TCartRowIncludedResponse[];
}

interface ICartDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        currency: string;
        discounts: {} | ICartDiscounts[];
        priceMode: string;
        store: string;
        totals: ITotals;
    };
}

export type TCartRowIncludedResponse = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse
    | ICarRowtItemsIncludedResponse;

export interface ICarRowtItemsIncludedResponse extends IAbstractRowIncludedResponse {
    type: EIncludeTypes.CART_ITEMS | EIncludeTypes.GUEST_CART_ITEMS;
    attributes: {
        amount: number | null;
        calculations: ICartItemCalculation;
        groupKey: string;
        quantity: number;
        sku: string
        abstractSku: string
    };
}
