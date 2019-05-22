import {
    IOrderCollectionParsed,
    IOrderCollectionResponse,
    IOrderDetailsItem,
    IOrderDetailsParsed,
    IOrderDetailsResponse,
    IOrderItem,
    IOrderItemResponse
} from '@interfaces/order';

export const parseGetOrdersCollectionResponse = (data: IOrderCollectionResponse): IOrderCollectionParsed | null => {
    if (!Array.isArray(data.data) || !data.data.length) {
        return null;
    }

    const items = data.data.map((item: IOrderItemResponse): IOrderItem => (
        {
            id: item.id,
            dateCreated: item.attributes.createdAt,
            currency: item.attributes.currencyIsoCode,
            totals: item.attributes.totals
        }
    ));

    const response = {
        items
    };

    return response;
};

export const parseGetOrderDetailsResponse = (data: IOrderDetailsResponse): IOrderDetailsParsed | null => {
    if (!data) {
        return null;
    }

    const attributes = data.attributes;
    type TAccumulator = { [key: string]: IOrderDetailsItem };
    const accumulator: TAccumulator = {};

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
    }, accumulator);

    const response: IOrderDetailsParsed = {
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

    return response;
};
