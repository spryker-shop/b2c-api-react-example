import * as CheckoutActions from '@stores/actions/pages/checkout';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { ICheckoutRequest } from '@interfaces/checkout';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { IRequestBody } from '@services/pages/Checkout/types';
import { parseCheckoutData } from '@helpers/parsing';
import { errorMessageInform } from '@helpers/common';

export class CheckoutService extends ApiServiceAbstract {
    public static async getCheckoutData(
        dispatch: Function,
        payload: ICheckoutRequest,
        anonymId: string
    ): Promise<void> {
        dispatch(CheckoutActions.getCheckoutDataInitPendingStateAction());
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

            const response: TApiResponseData = await api.post('checkout-data', body, headers);

            if (response.ok) {
                const payloadData = parseCheckoutData(response.data);
                dispatch(CheckoutActions.getCheckoutDataInitFulfilledStateAction(payloadData));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(CheckoutActions.getCheckoutDataInitRejectedStateAction(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CheckoutActions.getCheckoutDataInitRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async sendOrderData(dispatch: Function, payload: ICheckoutRequest, anonymId: string): Promise<void> {
        dispatch(CheckoutActions.sendCheckoutDataPendingStateAction());
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
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(CheckoutActions.sendCheckoutDataRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
