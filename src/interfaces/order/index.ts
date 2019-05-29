import { IAbstractTotals } from '@interfaces/abstract';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IOrderTotals extends IAbstractTotals {
    canceledTotal: number;
}

export interface IOrderCollectionParsed {
    items: IOrderItem[];
}

export interface IOrderCollectionResponse {
    data: IOrderItemResponse[];
}

export interface IOrderItem {
    id: string;
    dateCreated: string;
    currency: string;
    totals: IOrderTotals;
}

export interface IOrderItemResponse {
    attributes: {
        createdAt: string;
        currencyIsoCode: string;
        totals: IOrderTotals;
    };
    id: string;
}

export interface IOrderDetailsResponse {
    attributes: {
        createdAt: string,
        currencyIsoCode: string;
        expenses: IOrderDetailsExpenseItem[];
        items: IOrderDetailsItem[];
        totals: IOrderTotals;
        billingAddress: IAddressItemOrder;
        shippingAddress: IAddressItemOrder;
        priceMode: string;
    };
    id: string;
}

export interface IOrderDetailsParsed extends IOrderItem {
    expenses: IOrderDetailsExpenseItem[];
    items: IOrderDetailsItem[];
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
