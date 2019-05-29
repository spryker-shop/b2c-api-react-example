import { IProductPrices } from '@interfaces/product';
import { IIndexSignature, ITotals } from '@interfaces/common';

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
    prices?: IProductPrices;
    calculations?: ICartItemCalculation;
    groupKey?: string;
    isAvailable?: boolean;
    availableQuantity?: number;
    superAttributes?: IIndexSignature[];
    priceOriginalGross?: number;
    priceOriginalNet?: number;
    priceDefaultGross?: number;
    priceDefaultNet?: number;
}

export interface ICartDataParsed extends ICartCommonData {
    isCartEmpty?: boolean;
    items: ICartItem[];
    totalQty?: number;
}

export interface ICartCommonData {
    id: string;
    currency: string;
    discounts?: ICartDiscounts | {};
    priceMode: string;
    store: string;
    totals: ITotals;
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
