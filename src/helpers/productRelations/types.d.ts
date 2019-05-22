import {
    IProductCardImages,
    IProductLabel,
    IProductPricesItem
} from '@interfaces/product';
import {
    IRowConcreteProductsIncludedResponse,
    IRowProductAvailabilitiesIncludedResponse,
    IRowProductImageSetsIncludedResponse, IRowProductPricesIncludedResponse
} from '@helpers/product/types';
import { IRowCustomerCartItemsIncludedResponse } from '@helpers/cart/types';
import { IAvailableLabel } from '@interfaces/search';

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

export interface IProductRelationsLabel {
    id: string;
    type: string;
    attributes: IAvailableLabel;
}

export interface IProductOptions {
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPricesItem[];
    images?: IProductCardImages[];
}

export type IProductRelationsIncluded = IRowProductImageSetsIncludedResponse
    | IRowProductAvailabilitiesIncludedResponse
    | IRowProductPricesIncludedResponse
    | IRowConcreteProductsIncludedResponse
    | IRowCustomerCartItemsIncludedResponse
    | IProducRelationstLabel;
