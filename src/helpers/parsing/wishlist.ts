import {
    IWishlistDataResponse,
    IWishlistRawResponse,
    TWishlistRowIncludedResponse
} from '@services/pages/Wishlist/types';
import { EIncludeTypes } from '@services/types';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { parsePrices } from '@helpers/parsing/common';

export const parseWishlistResponse = (data: IWishlistDataResponse): IWishlist => {
    const wishlist: IWishlist = {
        id: data.id,
        name: data.attributes.name,
        numberOfItems: data.attributes.numberOfItems || 0,
        createdAt: data.attributes.createdAt,
        updatedAt: data.attributes.updatedAt,
    };

    return wishlist;
};

export const parseWishlistItems = (response: IWishlistRawResponse): IWishlistProduct[] => {
    if (!response.included) {
        return null;
    }

    const items: {[key: string]: IWishlistProduct} = {};

    response.included.forEach((row: TWishlistRowIncludedResponse) => {
        if (!items[row.id]) {
            items[row.id] = {attributes: [], image: ''} as IWishlistProduct;
        }

        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS) {
            if (
                row.attributes.imageSets &&
                row.attributes.imageSets.length &&
                row.attributes.imageSets[0].images &&
                row.attributes.imageSets[0].images.length
            ) {
                items[row.id].image = row.attributes.imageSets[0].images[0].externalUrlSmall;
            }

            return;
        }

        if (row.type === EIncludeTypes.WISHLIST_ITEMS) {
            items[row.id].sku = row.attributes.sku;
        }

        if (row.type === EIncludeTypes.CONCRETE_CONCRETE_PRODUCTS) {
            items[row.id].name = row.attributes.name;
            Object.keys(row.attributes.attributes).forEach((attr: string) => {
                if (row.attributes.superAttributesDefinition.includes(attr)) {
                    const attributeKey: string = String(attr);
                    const attributeValue: string = String(row.attributes.attributes[attr]);
                    items[row.id].attributes.push({[attributeKey]: attributeValue});
                }
            });

            return;
        }

        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_PRICES) {
            items[row.id].prices = parsePrices(row.attributes.prices);

            return;
        }

        if (row.type === EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES) {
            items[row.id].availability = row.attributes.availability;

            if (row.attributes.isNeverOutOfStock) {
                items[row.id].availability = true;
            }
        }
    });

    return Object.values(items);
};
