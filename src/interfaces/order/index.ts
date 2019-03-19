import { TProductName, TProductPrice, TProductQuantity, TProductSKU } from '@interfaces/product';
import { IAbstractTotals, TCanceledTotal } from '@interfaces/abstract/totals';
import { TCartPriceMode } from '@interfaces/cart';
import { IAddressItemOrder } from '@interfaces/addresses';
import { TAppCurrency } from '@interfaces/currency';

type TOrderCreatedAt = string;
export type TOrderDate = string;
export type TOrderId = string;
export type TOrderCollection = IOrderItem[] | null;
export type TOrderExpenseName = string;
export type TOrderProducts = IOrderDetailsItem[] | null;
export type TOrderExpenses = IOrderDetailsExpenseItem[] | null;

/**
 *  Order History
 */

export interface IOrderTotals extends IAbstractTotals {
    canceledTotal: TCanceledTotal;
}

export interface IOrderCollectionParsed {
    items: TOrderCollection;
}

export interface IOrderCollectionResponse {
    data: IOrderItemResponse[];
}

export interface IOrderItem {
    id: TOrderId;
    dateCreated: TOrderDate;
    currency: TAppCurrency;
    totals: IOrderTotals;
}

export interface IOrderItemResponse {
    attributes: {
        createdAt: TOrderCreatedAt;
        currencyIsoCode: TAppCurrency;
        totals: IOrderTotals;
    };
    id: TOrderId;
}

/**
 *  Order Detail
 */

export interface IOrderDetailsResponse {
    attributes: {
        createdAt: TOrderCreatedAt,
        currencyIsoCode: TAppCurrency;
        expenses: TOrderExpenses;
        items: IOrderDetailsItem[];
        totals: IOrderTotals;
        billingAddress: IAddressItemOrder;
        shippingAddress: IAddressItemOrder;
        priceMode: TCartPriceMode;
    };
    id: TOrderId;
}

export interface IOrderDetailsParsed extends IOrderItem {
    expenses: TOrderExpenses;
    items: TOrderProducts;
    billingAddress: IAddressItemOrder;
    shippingAddress: IAddressItemOrder;
    priceMode: TCartPriceMode;
}

export interface IOrderDetailsExpenseItem {
    name: TOrderExpenseName;
    sumPrice: TProductPrice;
}

export interface IOrderDetailsItem {
    name: TProductName;
    quantity: TProductQuantity;
    sku: TProductSKU;
    sumPrice: TProductPrice;
    sumPriceToPayAggregation: TProductPrice;
}

export type IOrderDetailsSelectedItems = {
    [sku: string]: boolean
};
