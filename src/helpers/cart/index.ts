import { ICartAddItem } from '@interfaces/cart';

export const createCartItemAddToCart = (sku: string, quantity: number): ICartAddItem => ({ sku, quantity });
