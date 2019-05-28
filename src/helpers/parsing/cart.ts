import { ICartCommonData, ICartDataParsed, ICartItem } from '@interfaces/cart';
import { parseImageSets, parsePrices } from '@helpers/parsing/common';
import { TCartRowIncludedResponse, ICartRawResponse, ICartDataResponse } from '@services/common/Cart/types';
import { IRelationshipsDataResponse, EIncludeTypes } from '@services/types';

export const parseCartCreateResponse = (response: ICartRawResponse): ICartDataParsed | null => {
    if (!response) {
        return null;
    }
    const data: ICartDataResponse[] = response.data as unknown as ICartDataResponse[];

    return {
        ...parseCommonDataInCartResponse(data[0]),
        items: []
    };
};

export const parseCartResponse = (response: ICartRawResponse): ICartDataParsed => {
    if (!response) {
        return null;
    }

    const { data, included } = response;
    const result: { [key: string]: ICartItem } = {};
    const isGuest = data.relationships && !Boolean(data.relationships.items);
    const itemName = isGuest ? EIncludeTypes.GUEST_CART_ITEMS : EIncludeTypes.CART_ITEMS;
    let totalQty: number = 0;

    if (data.relationships && data.relationships[itemName]) {
        data.relationships[itemName].data.forEach((data: IRelationshipsDataResponse) => {
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

    included && included.forEach((row: TCartRowIncludedResponse) => {
        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS) {
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

        if (row.type === EIncludeTypes.CONCRETE_PRODUCTS) {
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

        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_PRICES) {
            result[row.id].prices = parsePrices(row.attributes.prices);

            return;
        }

        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES) {
            result[row.id].availability = row.attributes.availability;
            result[row.id].availableQuantity = row.attributes.quantity;
        }
    });
    const items = Object.values(result);

    return {
        id: data.id,
        currency: data.attributes.currency,
        discounts: data.attributes.discounts,
        priceMode: data.attributes.priceMode,
        store: data.attributes.store,
        totals: data.attributes.totals,
        items,
        totalQty
    };
};
