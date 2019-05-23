import { api, ApiServiceAbstract } from '@services/api';
import { parseCatalogSearchResponse } from '@helpers/parsing';
import { ICatalogSearchDataParsed, ISearchQuery } from '@interfaces/search';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { sendSearchPendingState, sendSearchRejectState, sendSearchFulfilledState } from '@stores/actions/pages/search';

export class SearchService extends ApiServiceAbstract {
    public static async catalogSearch(dispatch: Function, params: ISearchQuery): Promise<void> {
        dispatch(sendSearchPendingState());
        try {
            params.include = 'abstract-products,product-labels,';
            const response: TApiResponseData = await api.get('catalog-search', params, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICatalogSearchDataParsed = parseCatalogSearchResponse(response.data);
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
}
