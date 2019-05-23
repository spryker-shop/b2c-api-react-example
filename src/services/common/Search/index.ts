import { api, ApiServiceAbstract } from '@services/api';
import { parseCatalogSearchResponse, parseSuggestionSearchResponse } from '@helpers/parsing';
import { ISearchQuery } from '@interfaces/search';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import {
    sendSearchPendingState,
    sendSearchRejectState,
    sendSearchFulfilledState,
    suggestPendingState,
    suggestRejectState,
    suggestFullfiledState
} from '@stores/actions/pages/search';

export class SearchService extends ApiServiceAbstract {
    public static async catalogSearch(dispatch: Function, params: ISearchQuery): Promise<void> {
        dispatch(sendSearchPendingState());
        try {
            params.include = 'abstract-products,product-labels,';
            const response: TApiResponseData = await api.get('catalog-search', params, { withCredentials: true });

            if (response.ok) {
                const responseParsed = parseCatalogSearchResponse(response.data);
                dispatch(sendSearchFulfilledState(responseParsed, params.q));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(sendSearchRejectState(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(sendSearchRejectState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async searchSuggestion(dispatch: Function, query: string): Promise<void> {
        dispatch(suggestPendingState());
        try {

            const response: TApiResponseData = await api.get(
                'catalog-search-suggestions',
                { q: query, include: 'abstract-products,abstract-product-prices' },
                { withCredentials: true }
            );

            if (response.ok) {
                const productsLimit = 5;
                const { data } = response;
                const products = parseSuggestionSearchResponse(data, productsLimit);
                const payloadSuggestionFulfilled = {
                    suggestions: products,
                    categories: data.data[0].attributes.categories,
                    completion: data.data[0].attributes.completion
                };
                dispatch(suggestFullfiledState(payloadSuggestionFulfilled));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(suggestRejectState(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });

                return null;
            }
        } catch (error) {
            dispatch(suggestRejectState(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
