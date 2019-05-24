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
    included: TProductRowIncludedResponse[];
}

interface IProductDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IProductAttributesRawResponse;
}

export type TProductRowIncludedResponse = IProductRowPricesIncludedResponse | IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse | IProductsConcreteRowIncludedResponse
    | IProductLabelsRowIncludedResponse;
