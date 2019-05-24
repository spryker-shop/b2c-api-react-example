import * as orderActions from '@stores/actions/pages/order';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { orderAuthenticateErrorMessage } from '@translation/';
import { parseGetOrderDetailsResponse, parseGetOrdersCollectionResponse } from '@helpers/parsing';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';
import { IOrderCollectionParsed, IOrderDetailsParsed } from '@interfaces/order';

export class OrderService extends ApiServiceAbstract {
    public static async getOrdersCollection(dispatch: Function): Promise<void> {
        dispatch(orderActions.ordersCollectionPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(orderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.get('orders', null, {withCredentials: true});

            if (response.ok) {
                const responseParsed: IOrderCollectionParsed = parseGetOrdersCollectionResponse(response.data);
                dispatch(orderActions.ordersCollectionFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(orderActions.ordersCollectionRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
      }

        } catch (error) {
            dispatch(orderActions.ordersCollectionRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: typeNotificationError
          });
        }
    }

    public static async getOrderDetails(dispatch: Function, orderId: string): Promise<void> {
        dispatch(orderActions.orderDetailsPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(orderAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const endpoint = `orders/${orderId}`;
            const response: TApiResponseData = await api.get(endpoint, null, {withCredentials: true});

            if (response.ok) {
                const responseParsed: IOrderDetailsParsed = parseGetOrderDetailsResponse(response.data);
                dispatch(orderActions.orderDetailsFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(orderActions.orderDetailsRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
      }

        } catch (error) {
            dispatch(orderActions.orderDetailsRejectedStateAction(error.message));
            NotificationsMessage({
              messageWithCustomText: 'unexpected.error.message',
              message: error.message,
              type: typeNotificationError
          });
        }
    }
}
