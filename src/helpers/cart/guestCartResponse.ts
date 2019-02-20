import { ICartDataResponse } from '@interfaces/cart';
import { parseImageSets } from '@helpers/product/imageSetsParser';
import {
    ICartItemDataShort,
    ICartResultData,
    IUserCartRawResponseOneValue,
    TRowCustomerCartIncludedResponse
} from '@helpers/cart/types';
import { parseCommonDataInCartResponse } from '@helpers/cart';
import { getCartItemBlueprint } from '@helpers/cart/item';

// TODO: Maybe it is a copypast of parseUserCartResponseMultiValue && parseUserCartResponseOneValue ???
export const parseGuestCartResponse = (response: IUserCartRawResponseOneValue): ICartDataResponse | null => {
    if (!response) {
        return null;
    }

    const {included, data} = response;
    const result: ICartResultData = {};
    let totalQty: number = 0;

    // Fill data with concrete products ids
    if (data.relationships && data.relationships['guest-cart-items']) {
        data.relationships['guest-cart-items'].data.forEach((datum: ICartItemDataShort) => {
            result[datum.id] = {...getCartItemBlueprint()};
        });
    }

    included && included.forEach((row: TRowCustomerCartIncludedResponse) => {
        if (row.type === 'concrete-product-image-sets') {
            const images = parseImageSets(row.attributes.imageSets);
            result[row.id].image = images[0].externalUrlSmall ? images[0].externalUrlSmall : null;
        } else {
            if (row.type === 'concrete-products') {
                result[row.id].name = row.attributes.name;

                if (Array.isArray(row.attributes.superAttributesDefinition)) {
                    result[row.id].superAttributes = [];
                    Object.keys(row.attributes.attributes).forEach((attribute: string) => {
                        if (row.attributes.superAttributesDefinition.includes(attribute)) {
                            const attributeKey: string = String(attribute);
                            const attributeValue: string = String(row.attributes.attributes[attribute]);
                            result[row.id].superAttributes.push({
                                [attributeKey]: attributeValue,
                            });
                        }
                    });
                }
            } else {
                if (row.type === 'concrete-product-availabilities') {
                    result[row.id].availability = row.attributes.availability;
                    result[row.id].availableQuantity = row.attributes.quantity;
                } else {
                    if (row.type === 'guest-cart-items') {
                        result[row.id] = {
                            ...result[row.id],
                            sku: row.id,
                            quantity: row.attributes.quantity,
                            amount: row.attributes.amount,
                            calculations: row.attributes.calculations,
                            groupKey: row.attributes.groupKey
                        };
                        totalQty += row.attributes.quantity;
                    }
                }
            }
        }
    });

    const items = Object.values(result);

    return {
        ...parseCommonDataInCartResponse(data),
        cartCreated: true,
        items,
        totalQty,
    };
};
