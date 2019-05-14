import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from '@services/types';
import { typeNotificationError } from '@constants/notifications';
import {
    productRelationsPendingAction,
    productRelationsRejectedAction,
    productRelationsFulfilledAction
} from '@stores/actions/common/productRelations';
import { parsePorductRelationsRequest } from '@helpers/productRelations/response';
import api from '@services/api';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';

export class ProductRelationsService extends ApiServiceAbstract {
    public static async getProductRelations(dispatch: Function, sku: string): Promise<void> {
        try {
            dispatch(productRelationsPendingAction());

            const response: IApiResponseData = await api.get(`abstract-products/${sku}/related-products`, {
                include: 'abstract-product-image-sets,' +
                'abstract-product-availabilities,' +
                'abstract-product-prices,' +
                'product-labels'
            });

            if (response.ok) {
                const parsedData = parsePorductRelationsRequest(response.data);
                dispatch(productRelationsFulfilledAction(parsedData));
            }
        } catch (error) {
            dispatch(productRelationsRejectedAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getProductRelationsCart(dispatch: Function, cartId: string): Promise<void> {
        try {
            dispatch(productRelationsPendingAction());

            const response: IApiResponseData = await api.get(`carts/${cartId}/up-selling-products`, {
                include: 'abstract-product-image-sets,' +
                    'abstract-product-availabilities,' +
                    'abstract-product-prices,' +
                    'product-labels'
            });

            if (response.ok) {
                const parsedData = parsePorductRelationsRequest(response.data);
                dispatch(productRelationsFulfilledAction(parsedData));
            }
        } catch (error) {
            dispatch(productRelationsRejectedAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
