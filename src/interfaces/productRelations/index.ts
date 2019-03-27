import { IProductCardImages, IProductLabel, IProductPricesItem, TProductName, TProductSKU } from '@interfaces/product';

export interface IProductRelationsItem {
    name: TProductName;
    sku: TProductSKU;
    label?: IProductLabel;
    price?: number;
    prices?: IProductPricesItem[];
    images?: IProductCardImages[];
}
