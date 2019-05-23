import { IRangeFacets, IValueFacets } from '@interfaces/search';
import { IIndexSignature } from '@interfaces/common';
import {
    IProductPricesResponse,
    IProductRowLabelsResponse,
    IProductCardImagesResponse
} from '@services/pages/Product/types';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface ICatalogSearchRawResponse {
    data: ICatalogSearchDataResponse[];
    included: ICatalogSearchRowIncludedResponse[];
}

interface ICatalogSearchDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        abstractProducts: IProductCardResponse[] | null,
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
        rangeFacets: IRangeFacets[] | null,
        sort: {
            currentSortOrder: string | null,
            currentSortParam: string | null,
            sortParamLocalizedNames: IIndexSignature,
            sortParamNames: string[] | null,
        },
        spellingSuggestion: string | null,
        valueFacets: IValueFacets[] | null,
        id: null | string,
    };
}

export type ICatalogSearchRowIncludedResponse = IProductRowLabelsResponse | ICatalogSearchRowAbstractProduct;

export interface ICatalogSearchRowAbstractProduct extends IAbstractRowIncludedResponse {
    type: 'abstract-products';
    relationships?: IIndexSignature;
}

export interface IProductCardResponse {
    images?: IProductCardImagesResponse[] | null;
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPricesResponse[];
}
