import { TProductQuantity, TProductSKU } from '@interfaces/product';
import { ICartAddItem, ICartItem } from '@interfaces/cart';

export const createCartItemAddToCart = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
    sku,
    quantity
});

export const getCartItemBlueprint = (): ICartItem => (
    {
        sku: null,
        abstractSku: null,
        name: null,
        image: null,
        quantity: null,
        amount: null,
        prices: [],
        calculations: null,
        groupKey: null,
        availability: null,
        availableQuantity: null,
        superAttributes: null,
        priceOriginalGross: null,
        priceOriginalNet: null,
        priceDefaultGross: null,
        priceDefaultNet: null
    }
);
