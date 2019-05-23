import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { ICheckoutRequest } from '@interfaces/checkout';
import * as CheckoutActions from '@stores/actions/pages/checkout';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';
import { IRequestBody } from '@services/pages/Checkout/types';
import { parseCheckoutData } from '@helpers/parsing';

export class CheckoutService extends ApiServiceAbstract {
    public static async getCheckoutData(
        dispatch: Function,
        payload: ICheckoutRequest,
        anonymId: string
    ): Promise<void> {
        try {
            let headers: { withCredentials: boolean, headers?: {} };

            if (anonymId) {
                headers = {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}};
            } else {
                const token = await RefreshTokenService.getActualToken(dispatch);
                setAuthToken(token);
                headers = {withCredentials: true};
            }

            const body: IRequestBody = {
                data: {
                    type: 'checkout-data',
                    attributes: payload,
                }
            };

            dispatch(CheckoutActions.getCheckoutDataInitPendingStateAction());

            const response: TApiResponseData = await api.post('checkout-data', body, headers);

            if (response.ok) {
                const payloadData = parseCheckoutData(response.data);
                dispatch(CheckoutActions.getCheckoutDataInitFulfilledStateAction(payloadData));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CheckoutActions.getCheckoutDataInitRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CheckoutActions.getCheckoutDataInitRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest, anonymId: string): Promise<void> {
        try {
            let headers: { withCredentials: boolean, headers?: {} };

            if (anonymId) {
                headers = {withCredentials: true, headers: {'X-Anonymous-Customer-Unique-Id': anonymId}};
            } else {
                const token = await RefreshTokenService.getActualToken(dispatch);
                setAuthToken(token);
                headers = {withCredentials: true};
            }

            const body: IRequestBody = {
                data: {
                    type: 'checkout',
                    attributes: payload,
                }
            };

            dispatch(CheckoutActions.sendCheckoutDataPendingStateAction());

            const response: TApiResponseData = await api.post('checkout', body, headers);

            if (response.ok) {
                const payload = response.data.data.attributes.orderReference;
                dispatch(CheckoutActions.sendCheckoutDataFulfilledStateAction(payload));
                NotificationsMessage({
                    id: 'order.successfully.created.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CheckoutActions.sendCheckoutDataRejectedStateAction(errorMessage));
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch(CheckoutActions.sendCheckoutDataRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
