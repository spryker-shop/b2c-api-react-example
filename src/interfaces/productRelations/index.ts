import { IProductLabel, IProductPrices } from '@interfaces/product';

export interface IProductRelationsItem {
    name: string;
    sku: string;
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPrices;
    image?: string;
}
