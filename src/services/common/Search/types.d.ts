import { IProductRowPricesIncludedResponse } from '@services/pages/Product/types';
import { IProductCardResponse } from '@services/pages/Search/types';
import { IAbstractRowIncludedResponse, IRelationshipsResponse } from '@services/types';

export interface ISuggestionSearchResponse {
    data: ISuggestionSearchDataResponse[];
    included: IProductRowPricesIncludedResponse[];
}

interface ISuggestionSearchDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: {
        abstractProducts: IProductCardResponse[] | null,
        completion: string[]
    };
}
