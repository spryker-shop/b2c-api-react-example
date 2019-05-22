import { IProductLabel, IProductPricesItem } from '@interfaces/product';

export interface IProductRelationsItem {
    name: string;
    sku: string;
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPricesItem[];
    image?: string;
}
