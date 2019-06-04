import { IOrderCollectionParsed, IOrderDetailsItem, IOrderDetailsParsed, IOrderItem } from '@interfaces/order';
import {
    IOrderDetailsRawResponse,
    IOrderCollectionRawResponse,
    IOrderCollectionDataResponse
} from '@services/pages/Order/types';

export const parseGetOrdersCollectionResponse = (response: IOrderCollectionRawResponse): IOrderCollectionParsed => {
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

export const parseGetOrderDetailsResponse = (response: IOrderDetailsRawResponse): IOrderDetailsParsed => {
    if (!response.data) {
        return null;
    }

    const { data, data: { attributes } } = response;
    type TAccumulator = { [key: string]: IOrderDetailsItem };

    const itemsParsed = attributes.items.reduce((accumulator: TAccumulator, item: IOrderDetailsItem) => {

        if (accumulator[item.sku]) {
            const prev = accumulator[item.sku];
            const sumPriceToPayAggregation = prev.sumPriceToPayAggregation + item.sumPriceToPayAggregation;

            accumulator[item.sku].sku = item.sku;
            accumulator[item.sku].quantity = prev.quantity + item.quantity;
            accumulator[item.sku].name = item.name;
            accumulator[item.sku].sumPrice = prev.sumPrice;
            accumulator[item.sku].sumPriceToPayAggregation = sumPriceToPayAggregation;

        } else {
            accumulator[item.sku] = item;
        }

        return accumulator;
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
