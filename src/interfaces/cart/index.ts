import { IAbstractTotals } from '@interfaces/abstract/totals';
import {
    TProductQuantity,
    TProductSKU,
    TProductImageSRC,
    TProductAvailability,
    IProductPricesItem,
    TPriceTypeOriginalGross,
    TPriceTypeOriginalNet,
    TPriceTypeDefaultGross,
    TPriceTypeDefaultNet,
    TProductName,
    TProductPrice
} from '@interfaces/product';
import { TAppCurrency } from '@interfaces/currency';

export type TCartId = string;
export type TCartPriceMode = string;
export type TCartStore = string;
export type TCartDisplayName = string;
export type TCartAmount = number;
export type TCartCode = string;
export type TCartAddItemCollection = ICartAddItem[] | null;

export interface ICartDiscounts {
    displayName: TCartDisplayName;
    amount: TCartAmount;
    code: TCartCode;
}

export interface ICartAddItem {
    sku: TProductSKU;
    quantity: TProductQuantity;
}

export interface ICartTotals extends IAbstractTotals {

}

export interface ICartItem {
    sku: TProductSKU | null;
    abstractSku: string;
    name?: TProductName | null;
    image?: TProductImageSRC | null;
    quantity?: TProductQuantity | null;
    amount?: TProductPrice | null;
    prices?: IProductPricesItem[];
    calculations?: ICartItemCalculation | null;
    groupKey?: string | null;
    availability?: TProductAvailability | null;
    availableQuantity?: TProductQuantity | null;
    superAttributes?: { [key: string]: string }[] | null;
    priceOriginalGross?: TPriceTypeOriginalGross;
    priceOriginalNet?: TPriceTypeOriginalNet;
    priceDefaultGross?: TPriceTypeDefaultGross;
    priceDefaultNet?: TPriceTypeDefaultNet;
}

export interface ICartDataResponse extends ICommonDataInCart {
    isCartEmpty?: boolean;
    items: ICartItem[];
    totalQty?: number;
}

export interface ICommonDataInCart {
    id: TCartId | null;
    currency: TAppCurrency;
    discounts?: ICartDiscounts | {};
    priceMode: TCartPriceMode | null;
    store: TCartStore | null;
    totals: ICartTotals;
    cartCreated?: boolean;
}

export interface ICartItemCalculation {
    sumDiscountAmountAggregation: number;
    sumDiscountAmountFullAggregation: number;
    sumGrossPrice: number;
    sumNetPrice: number;
    sumPrice: number;
    sumPriceToPayAggregation: number;
    sumProductOptionPriceAggregation: number;
    sumSubtotalAggregation: number;
    sumTaxAmountFullAggregation: number;
    taxRate: number;
    unitDiscountAmountAggregation: number;
    unitDiscountAmountFullAggregation: number;
    unitGrossPrice: number;
    unitNetPrice: number;
    unitPrice: number;
    unitPriceToPayAggregation: number;
    unitProductOptionPriceAggregation: number;
    unitSubtotalAggregation: number;
    unitTaxAmountFullAggregation: number;
}

interface ICartResponseItemAttributes {
    amount: number | null;
    calculations: ICartItemCalculation;
    groupKey: string;
    quantity: number;
    sku: string;
}

export interface ICartResponseItem {
    attributes: ICartResponseItemAttributes;
    id?: string;
    links?: object;
    relationships?: object;
    type?: string;
}
