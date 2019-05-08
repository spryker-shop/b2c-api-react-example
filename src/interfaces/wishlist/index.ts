import { IProductAttributes, IProductPricesItem } from '@interfaces/product';

export interface IWishlistProduct {
    sku: string;
    name: string;
    image: string;
    attributes: IProductAttributes[];
    prices: IProductPricesItem[];
    availability: boolean;
}

export interface IWishlist {
    id: string;
    name: string;
    numberOfItems: number;
    createdAt: string;
    updatedAt: string;
}
