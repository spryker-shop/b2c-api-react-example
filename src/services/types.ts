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
    CONCRETE_PRODUCTS = 'concrete-products',
    ABSTRACT_PRODUCTS = 'abstract-products',
    CONCRETE_PRODUCT_IMAGE_SETS = 'concrete-product-image-sets',
    ABSTRACT_PRODUCT_IMAGE_SETS = 'abstract-product-image-sets',
    CONCRETE_PRODUCT_PRICES = 'concrete-product-prices',
    ABSTRACT_PRODUCT_PRICES = 'abstract-product-prices',
    CONCRETE_PRODUCT_AVAILABILITIES = 'concrete-product-availabilities',
    ABSTRACT_PRODUCT_AVAILABILITIES = 'abstract-product-availabilities',
    WISHLIST_ITEMS = 'wishlist-items',
    PRODUCT_LABELS = 'product-labels',
    CART_ITEMS = 'items',
    GUEST_CART_ITEMS = 'guest-cart-items'
}

export interface IProductRowPricesIncludedResponse extends IAbstractRowIncludedResponse {
    type: EIncludeTypes.ABSTRACT_PRODUCT_PRICES | EIncludeTypes.CONCRETE_PRODUCT_PRICES;
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
    type: EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES | EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES;
    attributes: IProductAvailability;
}

interface IProductAvailability {
    availability: boolean | null;
    quantity?: number | null;
    isNeverOutOfStock?: boolean;
}

export interface IProductRowImageSetsIncludedResponse extends IAbstractRowIncludedResponse {
    type: EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS | EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS;
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
    type: EIncludeTypes.CONCRETE_PRODUCTS | EIncludeTypes.WISHLIST_ITEMS;
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
    type: EIncludeTypes.PRODUCT_LABELS;
    attributes: IProductAvailableLabelResponse;
    relationships?: {
        [EIncludeTypes.PRODUCT_LABELS]?: {
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
