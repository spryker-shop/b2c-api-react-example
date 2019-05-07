import { IAbstractTotals, TCanceledTotal } from '@interfaces/abstract/totals';
import { TCartPriceMode } from '@interfaces/cart';
import { IAddressItemOrder } from '@interfaces/addresses';
import { TAppCurrency } from '@interfaces/currency';

export interface IOrderTotals extends IAbstractTotals {
    canceledTotal: TCanceledTotal;
}

export interface IOrderCollectionParsed {
    items: IOrderItem[] | null;
}

export interface IOrderCollectionResponse {
    data: IOrderItemResponse[];
}

export interface IOrderItem {
    id: string;
    dateCreated: string;
    currency: TAppCurrency;
    totals: IOrderTotals;
}

export interface IOrderItemResponse {
    attributes: {
        createdAt: string;
        currencyIsoCode: TAppCurrency;
        totals: IOrderTotals;
    };
    id: string;
}

export interface IOrderDetailsResponse {
    attributes: {
        createdAt: string,
        currencyIsoCode: TAppCurrency;
        expenses: IOrderDetailsExpenseItem[] | null;
        items: IOrderDetailsItem[] | null;
        totals: IOrderTotals;
        billingAddress: IAddressItemOrder;
        shippingAddress: IAddressItemOrder;
        priceMode: TCartPriceMode;
    };
    id: string;
}

export interface IOrderDetailsParsed extends IOrderItem {
    expenses: IOrderDetailsExpenseItem[] | null;
    items: IOrderDetailsItem[] | null;
    billingAddress: IAddressItemOrder;
    shippingAddress: IAddressItemOrder;
    priceMode: TCartPriceMode;
}

export interface IOrderDetailsExpenseItem {
    name: string;
    sumPrice: number;
}

export interface IOrderDetailsItem {
    name: string;
    quantity: number;
    sku: string;
    sumPrice: number;
    sumPriceToPayAggregation: number;
    metadata: {
        image: string;
        superAttributes: {
            [name: string]: string
        }
    };
}

export type IOrderDetailsSelectedItems = {
    [sku: string]: boolean
};
