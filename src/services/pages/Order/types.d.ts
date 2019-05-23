import { IAddressItemOrder } from '@interfaces/addresses';
import { IOrderDetailsExpenseItem, IOrderDetailsItem, IOrderTotals } from '@interfaces/order';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface IOrderDetailsRawResponse {
    data: IOrderDetailsDataResponse;
}

interface IOrderDetailsDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
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
}

export interface IOrderCollectionRawResponse {
    data: IOrderCollectionDataResponse[];
}

export interface IOrderCollectionDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        createdAt: string;
        currencyIsoCode: string | null;
        totals: IOrderTotals;
    };
}
