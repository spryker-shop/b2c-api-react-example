import { IProductAttributeMap, IProductAttributes } from '@interfaces/product';
import { IIndexSignature } from '@intrfaces/common';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface IProductRawResponse {
    data: IProductDataResponse;
    included: TProductRowResponseIncluded[];
}

interface IProductDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IProductAttributesRawResponse;
}

export type TProductRowResponseIncluded = IProductRowPricesIncludedResponse | IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse | IProductsConcreteRowIncludedResponse | IProductRowLabelsResponse;

export interface IProductRowPricesIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-prices' | 'concrete-product-prices';
    attributes: {
        price: number;
        prices: IProductPricesResponse[];
    };
}

type TPriceTypeNameDefault = 'DEFAULT';
type TPriceTypeNameOriginal = 'ORIGINAL';

export interface IProductPricesResponse {
    grossAmount: number | null;
    netAmount: number | null;
    priceTypeName: TPriceTypeNameDefault | TPriceTypeNameOriginal;
    currency?: {
        code: string;
        name: string;
        symbol: string
    };
}

export interface IProductRowAvailabilitiesIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-availabilities' | 'concrete-product-availabilities';
    attributes: IProductAvailability;
}

interface IProductAvailability {
    availability: boolean | null;
    quantity?: number | null;
    isNeverOutOfStock?: boolean;
}

export interface IProductRowImageSetsIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-image-sets' | 'concrete-product-image-sets';
    attributes: {
        imageSets: IProductImageSetsRawResponse[];
    };
}

export interface IProductImageSetsRawResponse {
    images: IProductCardImagesResponse[];
    name?: string;
}

export interface IProductCardImagesResponse {
    externalUrlLarge: string;
    externalUrlSmall: string;
}

export interface IProductsConcreteRowIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'concrete-products' | 'wishlist-items';
    attributes: IProductAttributesRawResponse;
}

interface IProductAttributesRawResponse {
    sku: string;
    name: string;
    description: string;
    attributes: IProductAttributes;
    attributeNames: IIndexSignature;
    attributeMap: IProductAttributeMap;
    id: string;
    superAttributesDefinition?: string[];
    metaDescription: string;
    metaKeywords: string;
    metaTitle: string;
}

export interface IProductRowLabelsResponse extends IAbstractRowIncludedResponse {
    type: 'product-labels';
    attributes: IProductAvailableLabelResponse;
    relationships?: IIndexSignature;
}

interface IProductAvailableLabelResponse {
    id?: string;
    frontEndReference?: string;
    isExclusive?: boolean;
    name?: string;
    position?: number;
}

export interface IProductLabelsCollectionResponse {
    [id: string]: IProductAvailableLabelResponse;
}
