import { IAbstractTotals } from '@interfaces/abstract';
import { IProductPricesItem } from '@interfaces/product';
import { IIndexSignature } from '@interfaces/common';

export interface ICartDiscounts {
    displayName: string;
    amount: number;
    code: string;
}

export interface ICartAddItem {
    sku: string;
    quantity: number;
}

export interface ICartItem {
    sku: string;
    abstractSku: string;
    name?: string;
    image?: string;
    quantity?: number;
    amount?: number;
    prices?: IProductPricesItem[];
    calculations?: ICartItemCalculation;
    groupKey?: string;
    availability?: boolean;
    availableQuantity?: number;
    superAttributes?: IIndexSignature[];
    priceOriginalGross?: number;
    priceOriginalNet?: number;
    priceDefaultGross?: number;
    priceDefaultNet?: number;
}

export interface ICartDataResponse extends ICommonDataInCart {
    isCartEmpty?: boolean;
    items: ICartItem[];
    totalQty?: number;
}

export interface ICommonDataInCart {
    id: string;
    currency: string;
    discounts?: ICartDiscounts | {};
    priceMode: string;
    store: string;
    totals: IAbstractTotals;
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
