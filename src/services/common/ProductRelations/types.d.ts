import { IProductLabel, IProductPrices, IProductPricesResponse } from '@interfaces/product';
import {
    IAbstractRowIncludedResponse,
    IRelationshipsResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse
} from '@services/types';

export interface IProductRelationsRawResponse {
    data: IProductRelationsItemResponse[];
    included: IProductRelationsIncluded[];
}

export interface IProductRelationsItemResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        name: string;
        sku: string;
    };
}

export type IProductRelationsIncluded = IProductRowImageSetsIncludedResponse | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse | IProducRelationstLabel;

export interface IProductOptionsResponse {
    label?: IProductLabel[];
    price?: number;
    prices?: IProductPrices;
    image?: string;
}
