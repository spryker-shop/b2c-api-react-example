import { ICartAddItem } from '@interfaces/cart';
import { EIncludeTypes } from '@services/types';

export const createCartItemAddToCart = (sku: string, quantity: number): ICartAddItem => ({ sku, quantity });

export const cartEndpoint = (path: string, isUserLoggedIn: boolean): string => {
    const itemsIncludeType = isUserLoggedIn ? EIncludeTypes.CART_ITEMS : EIncludeTypes.GUEST_CART_ITEMS;

    const includeParams =
        `?include=${itemsIncludeType},` +
        `${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
        `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
        `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
        `${EIncludeTypes.CONCRETE_PRODUCTS},` +
        `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
        `${EIncludeTypes.CONCRETE_PRODUCT_PRICES},` +
        EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES;

    return `${path}${includeParams}`;
};
