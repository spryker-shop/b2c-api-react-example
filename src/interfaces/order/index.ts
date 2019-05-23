import { ITotals } from '@interfaces/common';
import { IAddressItemOrder } from '@interfaces/addresses';

export interface IOrderTotals extends ITotals {
    canceledTotal: number;
}

export interface IOrderCollectionParsed {
    items: IOrderItem[] | null;
}

export interface IOrderItem {
    id: string;
    dateCreated: string;
    currency: string | null;
    totals: IOrderTotals;
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
