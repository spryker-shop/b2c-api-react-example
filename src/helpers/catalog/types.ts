import { IProductCard } from '@interfaces/product';
import { IProductLabelResponse, RangeFacets, ValueFacets } from '@interfaces/searchPageData';

export interface ICatalogSearchRawResponse {
    data: [{
        attributes: {
            abstractProducts: IProductCard[] | null,
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
            rangeFacets: RangeFacets[] | null,
            sort: {
                currentSortOrder: string | null,
                currentSortParam: string | null,
                sortParamLocalizedNames: { [key: string]: string },
                sortParamNames: string[] | null,
            },
            spellingSuggestion: string | null,
            valueFacets: ValueFacets[] | null,
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
