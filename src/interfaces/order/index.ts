import { ITotals } from '@interfaces/common';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IOrderTotals extends ITotals {
    canceledTotal: number;
}

export interface IOrderCollectionParsed {
    items: IOrderItem[];
}

export interface IOrderItem {
    id: string;
    dateCreated: string;
    currency: string;
    totals: IOrderTotals;
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
