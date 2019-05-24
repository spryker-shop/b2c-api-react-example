import { IProductAttributes, IProductPrices } from '@interfaces/product';

export interface IWishlistProduct {
    sku: string;
    name: string;
    image: string;
    attributes: IProductAttributes[];
    prices: IProductPrices;
    availability: boolean;
}

export interface IWishlist {
    id: string;
    name: string;
    numberOfItems: number;
    createdAt: string;
    updatedAt: string;
}
