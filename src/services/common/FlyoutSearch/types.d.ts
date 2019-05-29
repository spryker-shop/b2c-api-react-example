import { IProductCardResponse } from '@services/pages/Search/types';
import {
    IAbstractRowIncludedResponse,
    IRelationshipsResponse,
    IProductRowPricesIncludedResponse
} from '@services/types';

export interface ISuggestionSearchRawResponse {
    data: ISuggestionSearchDataResponse[];
    included: IProductRowPricesIncludedResponse[];
}

interface ISuggestionSearchDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        abstractProducts: IProductCardResponse[] | null,
        completion: string[]
    };
}
