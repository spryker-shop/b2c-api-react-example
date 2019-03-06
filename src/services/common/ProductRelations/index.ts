import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { TProductSKU } from '@interfaces/product';
import { IApiResponseData } from '@services/types';
import { typeNotificationError } from '@constants/notifications';
import {
    productRelationsPendingAction,
    productRelationsRejectedAction,
    productRelationsFulfilledAction
} from '@stores/actions/common/productRelations';
import { parsePorductRelationsRequest } from '@helpers/productRelations/response';
import api from '@services/api';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';

export class ProductRelationsService extends ApiServiceAbstract {
    public static async getProductRelations(dispatch: Function, sku: TProductSKU): Promise<void> {
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
}
