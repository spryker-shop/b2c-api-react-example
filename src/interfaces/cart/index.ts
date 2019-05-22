import { IAbstractTotals } from '@interfaces/abstract';
import { IProductParsedPrices } from '@interfaces/product';
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
    sku: string | null;
    abstractSku: string;
    name?: string | null;
    image?: string | null;
    quantity?: number | null;
    amount?: number | null;
    prices?: IProductParsedPrices;
    calculations?: ICartItemCalculation | null;
    groupKey?: string | null;
    availability?: boolean | null;
    availableQuantity?: number | null;
    superAttributes?: IIndexSignature[] | null;
    priceOriginalGross?: number | null;
    priceOriginalNet?: number | null;
    priceDefaultGross?: number | null;
    priceDefaultNet?: number | null;
}

export interface ICartDataResponse extends ICommonDataInCart {
    isCartEmpty?: boolean;
    items: ICartItem[];
    totalQty?: number;
}

export interface ICommonDataInCart {
    id: string | null;
    currency: string | null;
    discounts?: ICartDiscounts | {};
    priceMode: string | null;
    store: string | null;
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
