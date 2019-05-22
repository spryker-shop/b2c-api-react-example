import { ICartDataResponse } from '@interfaces/cart';
import { parseImageSets } from '@helpers/parsing/common';
import {
    ICartItemDataShort,
    ICartResultData,
    IUserCartRawResponseOneValue,
    TRowCustomerCartIncludedResponse
} from '@helpers/cart/types';
import { parseCommonDataInCartResponse } from '@helpers/cart';
import { getCartItemBlueprint } from '@helpers/cart/item';
import { IProductPricesItem, priceTypeNameDefault, priceTypeNameOriginal } from '@interfaces/product';

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
        data.relationships['guest-cart-items'].data.forEach((data: ICartItemDataShort) => {
            result[data.id] = {...getCartItemBlueprint()};
        });
    }

    included && included.forEach((row: TRowCustomerCartIncludedResponse) => {
        if (row.type === 'concrete-product-image-sets') {
            result[row.id].image = parseImageSets(row.attributes.imageSets)[0].srcSmall;
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
            } else if (row.type === 'concrete-product-prices') {
                result[row.id].prices = row.attributes.prices;
                if (row.attributes.prices && row.attributes.prices.length) {
                    row.attributes.prices.forEach((priceData: IProductPricesItem) => {
                        if (priceData.priceTypeName === priceTypeNameDefault) {
                            result[row.id].priceDefaultGross = priceData.grossAmount;
                            result[row.id].priceDefaultNet = priceData.netAmount;
                        }
                        if (priceData.priceTypeName === priceTypeNameOriginal) {
                            result[row.id].priceOriginalGross = priceData.grossAmount;
                            result[row.id].priceOriginalNet = priceData.netAmount;
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
                            groupKey: row.attributes.groupKey,
                            abstractSku: row.attributes.abstractSku
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
