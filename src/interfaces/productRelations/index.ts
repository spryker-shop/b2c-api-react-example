import { IProductLabel, IProductParsedPrices } from '@interfaces/product';

export interface IProductRelationsItem {
    name: string;
    sku: string;
    label?: IProductLabel[];
    price?: number;
    prices?: IProductParsedPrices;
    image?: string;
}
