import { IProductLabel, IProductPricesResponse } from '@interfaces/product';
import {
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse
} from '@services/pages/Product/types';
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

export interface IProductOptions {
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPricesResponse[];
    image?: string;
}

export type IProductRelationsIncluded = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse
    | IRowCustomerCartItemsIncludedResponse
    | IProducRelationstLabel;
