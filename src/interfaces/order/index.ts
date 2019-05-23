import { ITotals } from '@interfaces/common';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IOrderTotals extends ITotals {
    canceledTotal: number;
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
    currency: string | null;
    totals: IOrderTotals;
}

export interface IOrderItemResponse {
    attributes: {
        createdAt: string;
        currencyIsoCode: string | null;
        totals: IOrderTotals;
    };
    id: string;
}

export interface IOrderDetailsResponse {
    attributes: {
        createdAt: string,
        currencyIsoCode: string | null;
        expenses: IOrderDetailsExpenseItem[] | null;
        items: IOrderDetailsItem[] | null;
        totals: IOrderTotals;
        billingAddress: IAddressItemOrder;
        shippingAddress: IAddressItemOrder;
        priceMode: string;
    };
    id: string;
}

export interface IOrderDetailsParsed extends IOrderItem {
    expenses: IOrderDetailsExpenseItem[] | null;
    items: IOrderDetailsItem[] | null;
    billingAddress: IAddressItemOrder;
    shippingAddress: IAddressItemOrder;
    priceMode: string;
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
