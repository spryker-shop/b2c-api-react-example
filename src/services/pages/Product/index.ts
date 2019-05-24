import * as productActions from '@stores/actions/pages/product';
import { api, ApiServiceAbstract } from '@services/api';
import { parseProductResponse } from '@helpers/parsing/product';
import { IProductDataParsed } from '@interfaces/product';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export class ProductService extends ApiServiceAbstract {
    public static async getAbstractData(dispatch: Function, sku: string): Promise<void> {
        dispatch(productActions.getProductDataItemPendingStateAction());
        try {
            const response: TApiResponseData = await api.get(`abstract-products/${ sku }`, {
                include: `${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
                    `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
                    `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
                    `${EIncludeTypes.CONCRETE_PRODUCTS},` +
                    `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
                    `${EIncludeTypes.CONCRETE_PRODUCT_PRICES},` +
                    `${EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES},` +
                    EIncludeTypes.PRODUCT_LABELS
            });

            if (response.ok) {
                const responseParsed: IProductDataParsed = parseProductResponse(response.data);
                dispatch(productActions.getProductDataFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(productActions.getProductDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(productActions.getProductDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
