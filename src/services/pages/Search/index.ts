import { api, ApiServiceAbstract } from '@services/api';
import { parseCatalogSearchResponse } from '@helpers/parsing';
import { ICatalogSearchDataParsed, ISearchQuery } from '@interfaces/search';
import { EIncludeTypes, TApiResponseData } from '@services/types';
import {
    sendSearchPendingState,
    sendSearchRejectedState,
    sendSearchFulfilledState
} from '@stores/actions/pages/search';
import { errorMessageInform } from '@helpers/common';

export class SearchService extends ApiServiceAbstract {
    public static async catalogSearch(dispatch: Function, params: ISearchQuery): Promise<void> {
        dispatch(sendSearchPendingState());
        try {
            params.include = `${EIncludeTypes.ABSTRACT_PRODUCTS},${EIncludeTypes.PRODUCT_LABELS}`;
            const response: TApiResponseData = await api.get('catalog-search', params, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICatalogSearchDataParsed = parseCatalogSearchResponse(response.data);
                dispatch(sendSearchFulfilledState(responseParsed, params.q));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(sendSearchRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(sendSearchRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
