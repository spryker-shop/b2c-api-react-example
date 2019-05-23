import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { ICartAddItem, ICartDataParsed, ICartCreatePayload } from '@interfaces/cart';
import { parseCartCreateResponse, parseCartResponse } from '@helpers/parsing';
import * as cartActions from '@stores/actions/common/cart';
import { CartAuthenticateErrorMessage } from '@translation/';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { TApiResponseData, IResponseError } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';

export class CartService extends ApiServiceAbstract {
    public static endpoint(path: string): string {
        const includeParams =
            '?include=items,' +
            'abstract-product-image-sets,' +
            'abstract-product-prices,' +
            'abstract-product-availabilities,' +
            'concrete-products,' +
            'concrete-product-image-sets,' +
            'concrete-product-prices,' +
            'concrete-product-availabilities';

        return `${path}${includeParams}`;
    }

    public static async getCustomerCarts(dispatch: Function): Promise<string> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(CartAuthenticateErrorMessage);
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
                this.errorMessageInform(response, dispatch);
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
        try {
            dispatch(cartActions.cartCreatePendingStateAction());

            const body = {
                data: {
                    type: 'carts',
                    attributes: payload
                }
            };

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint('carts');
            const response: TApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed = parseCartCreateResponse(response.data);
                dispatch(cartActions.cartCreateFulfilledStateAction(responseParsed));

                return responseParsed.id;
            } else {
                this.errorMessageInform(response, dispatch);
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
        try {
            dispatch(cartActions.cartAddItemPendingStateAction());

            const body = {
                data: {
                    type: 'items',
                    attributes: payload
                }
            };

            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${ cartId }/items`);
            const response: TApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICartDataParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'items.added.message',
                    type: typeNotificationSuccess
                });

            } else {
                this.errorMessageInform(response, dispatch);
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

    public static async cartDeleteItem(
        ACTION_TYPE: string,
        dispatch: Function,
        cartId: string,
        itemId: string
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const endpoint = `carts/${ cartId }/items/${ itemId }`;
            const response: TApiResponseData = await api.delete(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadCartDeleteItemFulfilled: { itemId }
                });

                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeNotificationSuccess
                });

                const endpoint = this.endpoint(`carts/${ cartId }`);
                const newCartResponse: TApiResponseData = await api.get(endpoint);

                if (newCartResponse.ok) {
                    const responseParsed: ICartDataParsed = parseCartResponse(newCartResponse.data);
                    dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
                } else {
                    this.errorMessageInform(newCartResponse, dispatch);
                }
            } else {
                this.errorMessageInform(response, dispatch);
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                error: error.message
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async cartUpdateItem(
        dispatch: Function,
        payload: ICartAddItem,
        cartId: string | null
    ): Promise<void> {
        try {
            dispatch(cartActions.cartUpdateItemPendingStateAction());

            const body = {
                data: {
                    type: 'items',
                    attributes: payload
                }
            };
            const { sku } = payload;

            const token = await RefreshTokenService.getActualToken(dispatch);

            if (!token) {
                Promise.reject(CartAuthenticateErrorMessage);
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
                this.errorMessageInform(response, dispatch);
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

    public static async moveItemsToCart(dispatch: Function, cartId: string, productsList: string[]): Promise<void> {
        try {
            for (const sku of productsList) {
                const payload = { sku, quantity: 1 };

                await CartService.cartAddItem(dispatch, payload, cartId);
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

    public static errorMessageInform(response: IResponseError, dispatch: Function): void {
        const errorMessage = this.getParsedAPIError(response);
        dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
        NotificationsMessage({
            messageWithCustomText: 'request.error.message',
            message: errorMessage,
            type: typeNotificationError
        });
    }
}
