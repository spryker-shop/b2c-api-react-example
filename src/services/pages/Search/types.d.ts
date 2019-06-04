import { IRangeFacets, IValueFacets } from '@interfaces/search';
import { IIndexSignature } from '@interfaces/common';
import {
    EIncludeTypes,
    IAbstractRowIncludedResponse,
    IRelationshipsResponse,
    IProductPricesResponse,
    IProductLabelsRowIncludedResponse,
    IProductCardImagesResponse
} from '@services/types';

export interface ICatalogSearchRawResponse {
    data: ICatalogSearchDataResponse[];
    included: ICatalogSearchRowIncludedResponse[];
}

interface ICatalogSearchDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        abstractProducts: IProductCardResponse[],
        pagination: {
            currentItemsPerPage: number,
            currentPage: number,
            maxPage: number,
            numFound: number,
            config: {
                defaultItemsPerPage: number,
                itemsPerPageParameterName: string,
                parameterName: string,
                validItemsPerPageOptions: number[],
            },
        },
        rangeFacets: IRangeFacets[],
        sort: {
            currentSortOrder: string,
            currentSortParam: string,
            sortParamLocalizedNames: IIndexSignature,
            sortParamNames: string[],
        },
        spellingSuggestion: string,
        valueFacets: IValueFacets[],
        id: string
    };
}

export type ICatalogSearchRowIncludedResponse = IProductLabelsRowIncludedResponse | ICatalogSearchRowAbstractProduct;

export interface ICatalogSearchRowAbstractProduct extends IAbstractRowIncludedResponse {
    type: EIncludeTypes.ABSTRACT_PRODUCTS;
    relationships?: IIndexSignature;
}

export interface IProductCardResponse {
    images?: IProductCardImagesResponse[];
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPricesResponse[];
}
