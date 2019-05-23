import { IProductCard, IProductLabel, IProductPrices } from '@interfaces/product';
import { IProductLabelResponse, IRangeFacets, IValueFacets } from '@interfaces/search';
import { IIndexSignature } from '@interfaces/common';
import { TProductRowResponseIncluded, IProductPricesResponse } from '@services/pages/Product/types';

export interface ICatalogSearchRawResponse {
    data: [{
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
        }
    }];
    included: [IRowCatalogSearchIncludedResponse];
    links: {
        first: string;
        last: string;
        next: string;
        self: string;
    };
}

export interface IRowCatalogSearchIncludedResponse {
    type: string;
    relationships?: {
        'product-labels'?: {
            data: IProductLabelResponse[],
        }
    };
    attributes: {
        isExclusive?: boolean;
        name?: string;
        position?: number;
        frontEndReference?: string;
    };
    id?: string;
}

export interface ISuggestionSearchResponse {
    data: [{
        attributes: {
            abstractProducts: IProductCardResponse[] | null,
            completion: string[]
        }
    }];
    included: [TProductRowResponseIncluded];
    links: {
        first: string;
        last: string;
        next: string;
        self: string;
    };
}

export interface IProductCardResponse {
    images?: IProductCardImagesResponse[] | null;
    price: number;
    abstractName: string;
    abstractSku: string;
    prices: IProductPricesResponse[];
}
