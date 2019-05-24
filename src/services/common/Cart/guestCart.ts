import * as cartActions from '@stores/actions/common/cart';
import { api, removeAuthToken, ApiServiceAbstract } from '@services/api';
import { ICartAddItem } from '@interfaces/cart';
import { parseCartResponse } from '@helpers/parsing';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';

export class GuestCartService extends ApiServiceAbstract {
    public static endpoint(path: string): string {
        const includeParams =
            `?include=${EIncludeTypes.GUEST_CART_ITEMS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
            `${EIncludeTypes.CONCRETE_PRODUCTS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_PRICES},` +
            EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES;

        return `${path}${includeParams}`;
    }

    public static async guestCartAddItem(dispatch: Function, payload: ICartAddItem, anonymId: string): Promise<void> {
        dispatch(cartActions.cartAddItemPendingStateAction());
        try {
            removeAuthToken();
            const body = { data: { type: 'guest-cart-items', attributes: payload } };
            const endpoint = this.endpoint('guest-cart-items');
            const response: TApiResponseData = await api.post(endpoint, body,
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'items.added.message',
                    type: typeNotificationSuccess
                });

                const responseParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                this.errorMessageInform(errorMessage);
                dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getGuestCart(dispatch: Function, anonymId: string): Promise<string> {
        dispatch(cartActions.getCartsPendingStateAction());
        try {
            removeAuthToken();
            const endpoint = this.endpoint('guest-carts');
            const response: TApiResponseData = await api.get(endpoint, {},
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                if (!response.data.data.length) {
                    dispatch(cartActions.getCartsFulfilledStateAction(null));

                    return;
                }

                const responseParsed = parseCartResponse({
                    data: response.data.data[0],
                    included: response.data.included
                });

                dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));

                return responseParsed.id;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                this.errorMessageInform(errorMessage);
                dispatch(cartActions.getCartsRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.getCartsRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async guestCartRemoveItem(
        dispatch: Function,
        cartUid: string,
        sku: string,
        anonymId: string
    ): Promise<void> {
        dispatch(cartActions.cartDeleteItemPendingStateAction());
        try {
            removeAuthToken();
            const endpoint = `guest-carts/${cartUid}/guest-cart-items/${sku}`;
            const response: TApiResponseData = await api.delete(endpoint, {},
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                dispatch(cartActions.cartDeleteItemFulfilledStateAction({ sku }));
                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeNotificationSuccess
                });
                await GuestCartService.getGuestCart(dispatch, anonymId);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                this.errorMessageInform(errorMessage);
                dispatch(cartActions.cartDeleteItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartDeleteItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async guestCartUpdate(
        dispatch: Function,
        payload: ICartAddItem,
        cartId: string,
        anonymId: string
    ): Promise<void> {
        dispatch(cartActions.cartUpdateItemPendingStateAction());
        try {
            removeAuthToken();
            const body = { data: { type: 'guest-cart-items', attributes: payload } };
            const { sku } = payload;

            const endpoint = this.endpoint(`guest-carts/${cartId}/guest-cart-items/${sku}`);
            const response: TApiResponseData = await api.patch(endpoint, body,
                { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId } }
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'cart.changed.quantity.message',
                    type: typeNotificationSuccess
                });

                const responseParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                this.errorMessageInform(errorMessage);
                dispatch(cartActions.cartUpdateItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartUpdateItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static errorMessageInform(errorMessage: string): void {
        NotificationsMessage({
            messageWithCustomText: 'request.error.message',
            message: errorMessage,
            type: typeNotificationError
        });
    }
}
