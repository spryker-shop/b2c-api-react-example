import { ICartDataParsed, ICartItem } from '@interfaces/cart';
import { parseImageSets, parsePrices } from '@helpers/parsing/common';
import { TCartRowIncludedResponse, ICartRawResponse, ICarRowtItemsIncludedResponse } from '@services/common/Cart/types';
import { IRelationshipsDataResponse, EIncludeTypes } from '@services/types';

export const parseCartResponse = (response: ICartRawResponse): ICartDataParsed => {
    if (!response) {
        return null;
    }

    const { data, included } = response;
    const result: { [key: string]: ICartItem } = {};
    const isGuest: boolean = data && data.relationships && !Boolean(data.relationships.items);
    const itemName: string = isGuest ? EIncludeTypes.GUEST_CART_ITEMS : EIncludeTypes.CART_ITEMS;
    let totalQty: number = 0;

    if (data && data.relationships && data.relationships[itemName]) {
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
                isAvailable: null,
                availableQuantity: null,
                superAttributes: null
            };
        });
    }

    included && data.relationships && included.forEach((row: TCartRowIncludedResponse) => {
        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS) {
            result[row.id].image = parseImageSets(row.attributes.imageSets)[0].srcSmall;

            return;
        }

        if (row.type === itemName) {
            const rowVariant: ICarRowtItemsIncludedResponse = row as unknown as ICarRowtItemsIncludedResponse;

            result[row.id].sku = row.id;
            result[row.id].quantity = rowVariant.attributes.quantity;
            result[row.id].amount = rowVariant.attributes.amount;
            result[row.id].calculations = rowVariant.attributes.calculations;
            result[row.id].abstractSku = rowVariant.attributes.abstractSku;
            totalQty += rowVariant.attributes.quantity;

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
            result[row.id].isAvailable = row.attributes.availability;
            result[row.id].availableQuantity = row.attributes.quantity;
        }
    });
    const items = Object.values(result);

    return {
        id: data ? data.id : null,
        currency: data && data.attributes ? data.attributes.currency : null,
        discounts: data && data.attributes ? data.attributes.discounts : null,
        priceMode: data && data.attributes ? data.attributes.priceMode : null,
        store: data && data.attributes ? data.attributes.store : null,
        totals: data && data.attributes ? data.attributes.totals : null,
        items,
        totalQty
    };
};
