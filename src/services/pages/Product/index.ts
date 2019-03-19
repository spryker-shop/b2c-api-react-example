import api from '@services/api';
import { parseProductResponse } from '@helpers/product';
import {
    getProductAvailabilityFulfilledStateAction,
    getProductAvailabilityPendingStateAction,
    getProductAvailabilityRejectedStateAction,
    getProductDataFulfilledStateAction,
    getProductDataItemPendingStateAction,
    getProductDataRejectedStateAction,
} from '@stores/actions/pages/product';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { IConcreteProductAvailability, IProductDataParsed, TProductSKU } from '@interfaces/product';
import { parseProductAvailabilityResponse } from '@helpers/product/productResponse';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export class ProductService extends ApiServiceAbstract {
    public static async getAbstractData(dispatch: Function, sku: string): Promise<void> {
        try {
            dispatch(getProductDataItemPendingStateAction());
            const response: IApiResponseData = await api.get(`abstract-products/${sku}`, {
                include: 'abstract-product-image-sets,' +
                'abstract-product-prices,' +
                'abstract-product-availabilities,' +
                'concrete-products,' +
                'concrete-product-image-sets,' +
                'concrete-product-prices,' +
                'concrete-product-availabilities',
            });

            if (response.ok) {
                const responseParsed: IProductDataParsed = parseProductResponse(response.data);
                dispatch(getProductDataFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(getProductDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(getProductDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getConcreteProductAvailability(dispatch: Function,
                                                       sku: TProductSKU): Promise<IConcreteProductAvailability | null> {
        try {
            dispatch(getProductAvailabilityPendingStateAction());
            const response: IApiResponseData = await api.get(
                `concrete-products/${sku}/concrete-product-availabilities`
            );

            if (response.ok) {
                const responseParsed: null | IConcreteProductAvailability = parseProductAvailabilityResponse(
                    response.data
                );
                dispatch(getProductAvailabilityFulfilledStateAction(responseParsed));

                return responseParsed;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(getProductAvailabilityRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(getProductAvailabilityRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
