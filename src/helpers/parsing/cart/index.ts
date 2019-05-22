import { ICartDataResponse, ICommonDataInCart } from '@interfaces/cart';
import { parseImageSets, parsePrices } from '@helpers/parsing/common';
import {
    ICartItemDataShort,
    ICartResultData,
    IUserCartRawResponseMultiValue,
    IUserCartRawResponse,
    TRowCustomerCartIncludedResponse,
    IUserCartRawResponseOneValue,
    ICustomerCartDataRawResponse
} from '@helpers/parsing/cart/types';

export const parseCartCreateResponse = (response: IUserCartRawResponseMultiValue): ICartDataResponse | null => {
    if (!response) {
        return null;
    }

    return {
        ...parseCommonDataInCartResponse(response.data[0]),
        items: []
    };
};

export const parseUserCartResponseMultiValue = (response: IUserCartRawResponseMultiValue): ICartDataResponse | null => {
    if (!response) {
        return null;
    }
    const { included } = response;
    const [data] = response.data;

    return parseUserCartResponse({ data, included });
};

export const parseUserCartResponseOneValue = (response: IUserCartRawResponseOneValue): ICartDataResponse | null => {
    if (!response) {
        return null;
    }

    return parseUserCartResponse(response);
};

const parseUserCartResponse = (response: IUserCartRawResponse): ICartDataResponse => {
    const { data, included } = response;
    const result: ICartResultData = {};
    const isGuest = data.relationships && !Boolean(data.relationships.items);
    const itemName = isGuest ? 'guest-cart-items' : 'items';
    let totalQty: number = 0;

    if (data.relationships && data.relationships[itemName]) {
        data.relationships[itemName].data.forEach((data: ICartItemDataShort) => {
            result[data.id] = {
                sku: null,
                abstractSku: null,
                name: null,
                image: null,
                quantity: null,
                amount: null,
                prices: {
                    priceOriginalGross: null,
                    priceOriginalNet: null,
                    priceDefaultGross: null,
                    priceDefaultNet: null
                },
                calculations: null,
                groupKey: null,
                availability: null,
                availableQuantity: null,
                superAttributes: null
            };
        });
    }

    included && included.forEach((row: TRowCustomerCartIncludedResponse) => {
        if (row.type === 'concrete-product-image-sets') {
            result[row.id].image = parseImageSets(row.attributes.imageSets)[0].srcSmall;

            return;
        }

        if (row.type === itemName) {
            result[row.id].sku = row.id;
            result[row.id].quantity = row.attributes.quantity;
            result[row.id].amount = row.attributes.amount;
            result[row.id].calculations = row.attributes.calculations;
            result[row.id].abstractSku = row.attributes.abstractSku;
            totalQty += row.attributes.quantity;

            return;
        }

        if (row.type === 'concrete-products') {
            result[row.id].name = row.attributes.name;

            if (Array.isArray(row.attributes.superAttributesDefinition)) {
                result[row.id].superAttributes = [];
                Object.keys(row.attributes.attributes).forEach((attribute: string) => {
                    if (row.attributes.superAttributesDefinition.includes(attribute)) {
                        const attributeKey: string = String(attribute);
                        const attributeValue: string = String(row.attributes.attributes[attribute]);
                        result[row.id].superAttributes.push({
                            [attributeKey]: attributeValue
                        });
                    }
                });
            }

            return;
        }

        if (row.type === 'concrete-product-prices') {
            result[row.id].prices = parsePrices(row.attributes.prices);

            return;
        }

        if (row.type === 'concrete-product-availabilities') {
            result[row.id].availability = row.attributes.availability;
            result[row.id].availableQuantity = row.attributes.quantity;
        }
    });
    const items = Object.values(result);

    return {
        ...parseCommonDataInCartResponse(data),
        items,
        totalQty
    };
};

const parseCommonDataInCartResponse = (data: ICustomerCartDataRawResponse): ICommonDataInCart => ({
    id: data.id,
    currency: data.attributes.currency,
    discounts: data.attributes.discounts,
    priceMode: data.attributes.priceMode,
    store: data.attributes.store,
    totals: data.attributes.totals
});
