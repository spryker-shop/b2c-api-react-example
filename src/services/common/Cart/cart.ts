import * as cartActions from '@stores/actions/common/cart';
import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { ICartAddItem, ICartDataParsed, ICartCreatePayload } from '@interfaces/cart';
import { parseCartCreateResponse, parseCartResponse } from '@helpers/parsing';
import { cartAuthenticateErrorMessage } from '@translation/';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';

export class CartService extends ApiServiceAbstract {
    public static endpoint(path: string): string {
        const includeParams =
            `?include=${EIncludeTypes.CART_ITEMS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
            `${EIncludeTypes.CONCRETE_PRODUCTS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_PRICES},` +
            EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES;

        return `${path}${includeParams}`;
    }

    public static async getCustomerCarts(dispatch: Function): Promise<string> {
        dispatch(cartActions.getCartsPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(cartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint('/carts');
            const response: TApiResponseData = await api.get(endpoint, { withCredentials: true });

            if (response.ok) {
                if (!response.data.data[0].id) {
                    return;
                }

                const responseParsed: ICartDataParsed = parseCartResponse({
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
        } catch (err) {
            dispatch(cartActions.getCartsRejectedStateAction(err.message));
            NotificationsMessage({
                messageWithCustomText: 'request.error.message',
                message: err.message,
                type: typeNotificationError
            });
        }
    }

    public static async cartCreate(dispatch: Function, payload: ICartCreatePayload): Promise<string> {
        dispatch(cartActions.cartCreatePendingStateAction());
        try {
            const body = {
                data: {
                    type: 'carts',
                    attributes: payload
                }
            };

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(cartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint('carts');
            const response: TApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed = parseCartCreateResponse(response.data);
                dispatch(cartActions.cartCreateFulfilledStateAction(responseParsed));

                return responseParsed.id;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                this.errorMessageInform(errorMessage);
                dispatch(cartActions.cartCreateRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartCreateRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async cartAddItem(dispatch: Function, payload: ICartAddItem, cartId: string): Promise<void> {
        dispatch(cartActions.cartAddItemPendingStateAction());
        try {
            const body = {
                data: {
                    type: 'items',
                    attributes: payload
                }
            };

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(cartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${cartId}/items`);
            const response: TApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICartDataParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'items.added.message',
                    type: typeNotificationSuccess
                });

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

    public static async createCartAndAddItem(dispatch: Function, payload: ICartCreatePayload, item: ICartAddItem) {
        const cartId = await CartService.cartCreate(dispatch, payload);

        if (cartId) {
            await CartService.cartAddItem(dispatch, item, cartId);
        }
    }

    public static async cartDeleteItem(dispatch: Function, cartId: string, sku: string): Promise<void> {
        dispatch(cartActions.cartDeleteItemPendingStateAction());
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `carts/${cartId}/items/${sku}`;
            const response: TApiResponseData = await api.delete(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                dispatch(cartActions.cartDeleteItemFulfilledStateAction({ sku }));
                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeNotificationSuccess
                });

                await CartService.getCustomerCarts(dispatch);
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

    public static async cartUpdateItem(dispatch: Function, payload: ICartAddItem, cartId: string): Promise<void> {
        dispatch(cartActions.cartUpdateItemPendingStateAction());
        try {
            const body = {
                data: {
                    type: 'items',
                    attributes: payload
                }
            };
            const { sku } = payload;

            const token = await RefreshTokenService.getActualToken(dispatch);

            if (!token) {
                Promise.reject(cartAuthenticateErrorMessage);
            }

            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${ cartId }/items/${ sku }`);
            const response: TApiResponseData = await api.patch(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICartDataParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'cart.changed.quantity.message',
                    type: typeNotificationSuccess
                });
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
