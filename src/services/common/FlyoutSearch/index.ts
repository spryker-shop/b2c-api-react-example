import { api, ApiServiceAbstract } from '@services/api';
import { parseFlyoutSearchResponse } from '@helpers/parsing';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { suggestPendingState, suggestRejectState, suggestFullfiledState } from '@stores/actions/pages/search';
import { IProductCard } from '@interfaces/product';

export class FlyoutSearchService extends ApiServiceAbstract {
    public static async searchSuggestion(dispatch: Function, query: string): Promise<void> {
        dispatch(suggestPendingState());
        try {
            const response: TApiResponseData = await api.get(
                'catalog-search-suggestions',
                { q: query, include: `${EIncludeTypes.ABSTRACT_PRODUCTS},${EIncludeTypes.ABSTRACT_PRODUCT_PRICES}` },
                { withCredentials: true }
            );

            if (response.ok) {
                const productsLimit = 5;
                const { data } = response;
                const products: IProductCard[] = parseFlyoutSearchResponse(data, productsLimit);
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
