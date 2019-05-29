import { IOrderCollectionParsed, IOrderDetailsItem, IOrderDetailsParsed, IOrderItem } from '@interfaces/order';
import {
    IOrderDetailsRawResponse,
    IOrderCollectionRawResponse,
    IOrderCollectionDataResponse
} from '@services/pages/Order/types';

export const parseGetOrdersCollectionResponse = (
    response: IOrderCollectionRawResponse
): IOrderCollectionParsed | null => {
    if (!Array.isArray(response.data) || !response.data.length) {
        return null;
    }

    const items: IOrderItem[] = response.data.map((item: IOrderCollectionDataResponse): IOrderItem => ({
        id: item.id,
        dateCreated: item.attributes.createdAt,
        currency: item.attributes.currencyIsoCode,
        totals: item.attributes.totals
    }));

    return {
        items
    };
};

export const parseGetOrderDetailsResponse = (response: IOrderDetailsRawResponse): IOrderDetailsParsed | null => {
    if (!response.data) {
        return null;
    }

    const { data, data: { attributes } } = response;
    type TAccumulator = { [key: string]: IOrderDetailsItem };

    const itemsParsed = attributes.items.reduce((acc: TAccumulator, item: IOrderDetailsItem) => {

        if (acc[item.sku]) {
            const prev = acc[item.sku];
            acc[item.sku].sku = item.sku;
            acc[item.sku].quantity = prev.quantity + item.quantity;
            acc[item.sku].name = item.name;
            acc[item.sku].sumPrice = prev.sumPrice;
            acc[item.sku].sumPriceToPayAggregation = prev.sumPriceToPayAggregation + item.sumPriceToPayAggregation;

        } else {
            acc[item.sku] = item;
        }

        return acc;
    }, {});

    return {
        id: data.id,
        dateCreated: attributes.createdAt,
        currency: attributes.currencyIsoCode,
        totals: attributes.totals,
        expenses: attributes.expenses,
        items: Object.values(itemsParsed),
        billingAddress: attributes.billingAddress,
        shippingAddress: attributes.shippingAddress,
        priceMode: attributes.priceMode
    };
};
