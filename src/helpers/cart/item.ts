import { ICartAddItem, ICartItem } from '@interfaces/cart';

export const createCartItemAddToCart = (sku: string, quantity: number): ICartAddItem => ({
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
