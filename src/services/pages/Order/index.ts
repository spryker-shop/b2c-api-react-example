import api, { setAuthToken } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import {
    orderDetailsFulfilledStateAction,
    orderDetailsPendingStateAction,
    orderDetailsRejectedStateAction,
    ordersCollectionFulfilledStateAction,
    ordersCollectionPendingStateAction,
    ordersCollectionRejectedStateAction,
} from '@stores/actions/pages/order';
import { OrderAuthenticateErrorMessage } from '@translation';
import { parseGetOrderDetailsResponse, parseGetOrdersCollectionResponse } from '@helpers/order/response';
import { TOrderId } from '@interfaces/order';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export class OrderService extends ApiServiceAbstract {
    // Get collection of orders
    public static async getOrdersCollection(dispatch: Function): Promise<void> {
        try {
            dispatch(ordersCollectionPendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(OrderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.get('orders', null, {withCredentials: true});

            if (response.ok) {
                const responseParsed = parseGetOrdersCollectionResponse(response.data);
                dispatch(ordersCollectionFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(ordersCollectionRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
      }

        } catch (error) {
            dispatch(ordersCollectionRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: typeNotificationError
          });
        }
    }

    // Get order by reference
    public static async getOrderDetails(dispatch: Function, orderId: TOrderId): Promise<void> {
        try {
            dispatch(orderDetailsPendingStateAction());

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(OrderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const endpoint = `orders/${orderId}`;
            const response: IApiResponseData = await api.get(endpoint, null, {withCredentials: true});

            if (response.ok) {
                const responseParsed = parseGetOrderDetailsResponse(response.data.data);
                dispatch(orderDetailsFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(orderDetailsRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
      }

        } catch (error) {
            dispatch(orderDetailsRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: typeNotificationError
          });
        }
    }
}
