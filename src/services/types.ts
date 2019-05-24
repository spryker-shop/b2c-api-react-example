import { ApiResponse } from 'apisauce';
import { IProductAttributeMap, IProductAttributes } from '@interfaces/product';
import { IIndexSignature } from '@interfaces/common';

export type TApiResponseData = ApiResponse<any>;

export interface IApiErrorResponse {
    error?: string;
}

export interface IErrorItem {
    code: string;
    detail: string;
    status: number;
}

export interface IResponseError {
    problem?: string;
    data?: {
        errors: IErrorItem[],
    };
}

export interface IAbstractRowIncludedResponse {
    type: string;
    links: {
        self: string;
    };
    id?: string;
}

export interface IRelationshipsResponse {
    relationships?: {
        [key: string]: {
            data: IRelationshipsDataResponse[]
        };
    };
}

export interface IRelationshipsDataResponse {
    type: string;
    id: string;
}

export enum EIncludeTypes {
    CONCRETE_PRODUCT_IMAGE_SETS = 'concrete-product-image-sets',
    CONCRETE_CONCRETE_PRODUCTS = 'concrete-products',
    CONCRETE_PRODUCT_PRICES = 'concrete-product-prices',
    CONCRETE_PRODUCT_AVAILABILITIES = 'concrete-product-availabilities',
    WISHLIST_ITEMS = 'wishlist-items'
}

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

export interface IProductLabelsRowIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'product-labels';
    attributes: IProductAvailableLabelResponse;
    relationships?: {
        'product-labels'?: {
            data: IProductAvailableLabelResponse[],
        }
    };
}

export interface IProductAvailableLabelResponse {
    id?: string;
    frontEndReference?: string;
    isExclusive?: boolean;
    name?: string;
    position?: number;
}

export interface IProductLabelsCollectionResponse {
    [id: string]: IProductAvailableLabelResponse;
}
