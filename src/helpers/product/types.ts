import {
    IProductAttributesRawResponse,
    IProductAvailability,
    IProductPricesItem,
    TProductImageSetsCollectionRawResponse,
} from '@interfaces/product';
import { IAbstractRowIncludedResponse } from '@interfaces/abstract/rowIncludedresponse';
import { IProductRelationsItemRelationships } from '@helpers/productRelations/types';

export interface IProductDataResponse {
    attributes: IProductAttributesRawResponse;
    relationships: IProductRelationsItemRelationships;
}

export interface IProductRawResponse {
    data: IProductDataResponse;
    links: {
        self: string;
    };
    type: string;
    included: TRowProductResponseIncluded[];
}

export type TRowProductResponseIncluded = IRowProductPricesIncludedResponse
    | IRowProductImageSetsIncludedResponse
    | IRowProductAvailabilitiesIncludedResponse
    | IRowConcreteProductsIncludedResponse
    | IRowProductLabelsResponse;

export interface IProductAvailabilitiesRawResponse {
    data: [{
        attributes: IProductAvailability;
        id: string;
    }];
    links: {
        self: string;
    };
    type: string;
}

export interface ISuperAttribute {
    name: string;
    nameToShow: string;
    data: ISuperAttributeData[];
}

export interface ISuperAttributeData {
    value: string;
    name: string;
    idProductConcrete?: string | number;
}

export interface IRowProductPricesIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-prices' | 'concrete-product-prices';
    attributes: {
        price: number;
        prices: IProductPricesItem[];
    };
}

export interface IRowProductImageSetsIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-image-sets' | 'concrete-product-image-sets';
    attributes: {
        imageSets: TProductImageSetsCollectionRawResponse;
    };
}

export interface IRowProductAvailabilitiesIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'abstract-product-availabilities' | 'concrete-product-availabilities';
    attributes: IProductAvailability;
}

export interface IRowConcreteProductsIncludedResponse extends IAbstractRowIncludedResponse {
    type: 'concrete-products';
    attributes: IProductAttributesRawResponse;
}

export interface IRowProductLabelsResponse extends IAbstractRowIncludedResponse {
    type: 'product-labels';
    attributes: {
        isExclusive?: boolean;
        name?: string;
        position?: number;
        frontEndReference?: string;
    };
    id?: string;
}
