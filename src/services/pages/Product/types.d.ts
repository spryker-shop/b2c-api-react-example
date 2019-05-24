import { IIndexSignature } from '@intrfaces/common';
import {
    IAbstractRowIncludedResponse,
    IRelationshipsResponse,
    IProductRowPricesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductsConcreteRowIncludedResponse,
    IProductLabelsRowIncludedResponse
} from '@services/types';

export interface IProductRawResponse {
    data: IProductDataResponse;
    included: TProductRowResponseIncluded[];
}

interface IProductDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IProductAttributesRawResponse;
}

export type TProductRowResponseIncluded = IProductRowPricesIncludedResponse | IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse | IProductsConcreteRowIncludedResponse
    | IProductLabelsRowIncludedResponse;
