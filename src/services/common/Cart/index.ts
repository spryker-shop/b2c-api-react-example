import api, { setAuthToken } from '@services/api';
import { ICartAddItem, ICartDataResponse } from '@interfaces/cart';
import {
    parseUserCartResponseMultiValue,
    parseCartCreateResponse,
    parseUserCartResponseOneValue
} from '@helpers/parsing';
import * as cartActions from '@stores/actions/common/cart';
import { CartAuthenticateErrorMessage } from '@translation/';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { ICartCreatePayload } from './types';
import { IResponseError } from '@services/apiAbstractions/types';
import { IApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import {
    typeNotificationSuccess,
    typeNotificationError
} from '@constants/notifications';

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
                throw new Error(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint('/carts');
            const response: IApiResponseData = await api.get(endpoint, { withCredentials: true });

            if (response.ok) {
                if (!response.data.data[0].id) {
                    return '';
                }

                const responseParsed: ICartDataResponse = parseUserCartResponseMultiValue(response.data);
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

            return '';
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
                throw new Error(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint('carts');
            const response: IApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed = parseCartCreateResponse(response.data);
                dispatch(cartActions.cartCreateFulfilledStateAction(responseParsed));

                return responseParsed.id;
            } else {
                this.errorMessageInform(response, dispatch);

                return '';
            }

        } catch (error) {
            dispatch(cartActions.cartCreateRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });

            return '';
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
                throw new Error(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${cartId}/items`);
            const response: IApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICartDataResponse = parseUserCartResponseOneValue(response.data);
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

            const endpoint = `carts/${cartId}/items/${itemId}`;
            const response: IApiResponseData = await api.delete(endpoint, {}, { withCredentials: true });

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadCartDeleteItemFulfilled: { itemId }
                });

                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeNotificationSuccess
                });

                const endpoint = this.endpoint(`carts/${cartId}`);
                const newCartResponse: IApiResponseData = await api.get(endpoint);

                if (newCartResponse.ok) {
                    const responseParsed: ICartDataResponse = parseUserCartResponseOneValue(newCartResponse.data);
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
                throw new Error(CartAuthenticateErrorMessage);
            }

            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${cartId}/items/${sku}`);
            const response: IApiResponseData = await api.patch(endpoint, body, { withCredentials: true });

            if (response.ok) {
                const responseParsed: ICartDataResponse = parseUserCartResponseOneValue(response.data);
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

    public static async cartMultipleItems(
        dispatch: Function,
        payload: ICartAddItem[] | null,
        cartId: string | null,
        payloadCartCreate: ICartCreatePayload
    ): Promise<void> {
        if (!payload) {
            return;
        }

        try {
            if (!cartId) {
                try {
                    cartId = await CartService.cartCreate(dispatch, payloadCartCreate);
                } catch (err) {
                    console.error('await CartService.cartCreate err', err);
                }
            }
            let globalResponse: boolean = true;

            for (const item of payload) {
                if (!globalResponse) {
                    dispatch(
                        cartActions.cartAddItemRejectedStateAction('Error in processing adding products in sequence')
                    );
                    break;
                }

                dispatch(cartActions.cartAddItemPendingStateAction());

                const processResult = await this.addingItemProcess(dispatch, item, cartId);

                if (processResult.ok) {
                    const responseParsed: ICartDataResponse = parseUserCartResponseMultiValue(processResult.data);
                    dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
                    globalResponse = true;
                } else {
                    this.errorMessageInform(processResult, dispatch);
                    globalResponse = false;
                }
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

    public static async addingItemProcess(
        dispatch: Function,
        payload: ICartAddItem,
        cartId: string
    ): Promise<IApiResponseData> {
        const body = {
            data: {
                type: 'items',
                attributes: payload
            }
        };

        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(CartAuthenticateErrorMessage);
            }
            setAuthToken(token);

            const endpoint = this.endpoint(`carts/${cartId}/items`);
            const response: IApiResponseData = await api.post(endpoint, body, { withCredentials: true });

            return response;
        } catch (error) {
            console.error('CartService: cartAddItem: error', error);
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
