import {
    IProductCardImages,
    IProductLabel,
    IProductPricesItem,
    TProductDescription,
    TProductName,
    TProductSKU
} from '@interfaces/product';
import {
    IRowConcreteProductsIncludedResponse,
    IRowProductAvailabilitiesIncludedResponse,
    IRowProductImageSetsIncludedResponse, IRowProductPricesIncludedResponse
} from '@helpers/product/types';
import { IRowCustomerCartItemsIncludedResponse } from '@helpers/cart/types';

export interface IProductRelationsRawResponse {
    data: IProductRelationsItemResponse[];
    included: IProductRelationsIncluded[];
}

export interface IProductRelationsItemResponse {
    attributes: {
        name: TProductName;
        sku: TProductSKU;
    };
    id: string;
    relationships: IProductRelationsItemRelationships;
}

export interface IProductRelationsItemRelationships {
    [key: string]: {
        data: [
            {
                type: string;
                id: string;
            }
        ]
    };
}

export interface IProductOptions {
    label?: IProductLabel;
    price?: number;
    prices?: IProductPricesItem[];
    images?: IProductCardImages[];
}

export type IProductRelationsIncluded = IRowProductImageSetsIncludedResponse
    | IRowProductAvailabilitiesIncludedResponse
    | IRowProductPricesIncludedResponse
    | IRowConcreteProductsIncludedResponse
    | IRowCustomerCartItemsIncludedResponse;
