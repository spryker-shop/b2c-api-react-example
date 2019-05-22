import { IProductLabel, IProductPricesItem } from '@interfaces/product';
import {
    IRowConcreteProductsIncludedResponse,
    IRowProductAvailabilitiesIncludedResponse,
    IRowProductImageSetsIncludedResponse,
    IRowProductPricesIncludedResponse
} from '@helpers/parsing/product/types';
import { IRowCustomerCartItemsIncludedResponse } from '@helpers/parsing/cart/types';

export interface IProductRelationsRawResponse {
    data: IProductRelationsItemResponse[];
    included: IProductRelationsIncluded[];
}

export interface IProductRelationsItemResponse {
    attributes: {
        name: string;
        sku: string;
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
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPricesItem[];
    image?: string;
}

export type IProductRelationsIncluded = IRowProductImageSetsIncludedResponse
    | IRowProductAvailabilitiesIncludedResponse
    | IRowProductPricesIncludedResponse
    | IRowConcreteProductsIncludedResponse
    | IRowCustomerCartItemsIncludedResponse
    | IProducRelationstLabel;
