import * as cartActions from '@stores/actions/common/cart';
import { api, setAuthToken, ApiServiceAbstract, removeAuthToken } from '@services/api';
import { ICartAddItem, ICartDataParsed } from '@interfaces/cart';
import { parseCartResponse } from '@helpers/parsing';
import { cartAuthenticateErrorMessage } from '@translation/';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { TApiResponseData } from '@services/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { cartEndpoint } from '@helpers/cart';
import { errorMessageInform } from '@helpers/common';

export class CartService extends ApiServiceAbstract {
    public static async getCustomerCarts(dispatch: Function, anonymId: string = null, isUserLoggedIn = true): Promise<string> {
        dispatch(cartActions.getCartsPendingStateAction());
        try {
            if (isUserLoggedIn) {
                const token = await RefreshTokenService.getActualToken(dispatch);
                if (!token) {
                    Promise.reject(cartAuthenticateErrorMessage);
                }
                setAuthToken(token);
            }

            if (!isUserLoggedIn) {
                removeAuthToken();
            }

            const requestHeader = !isUserLoggedIn
                ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
                : { withCredentials: true };
            const cartType = isUserLoggedIn ? 'carts' : 'guest-carts';
            const endpoint = cartEndpoint(cartType, isUserLoggedIn);
            const response: TApiResponseData = await api.get(endpoint, {}, requestHeader);

            if (response.ok) {
                if (!response.data.data.length) {
                    dispatch(cartActions.getCartsFulfilledStateAction(null));

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
                errorMessageInform(errorMessage);
                dispatch(cartActions.getCartsRejectedStateAction(errorMessage));
            }
        } catch (error) {
            dispatch(cartActions.getCartsRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async cartAddItem(dispatch: Function, payload: ICartAddItem, cartId: string, anonymId: string = null, isUserLoggedIn = true): Promise<void> {
        dispatch(cartActions.cartAddItemPendingStateAction());
        try {
            if (isUserLoggedIn) {
                const token = await RefreshTokenService.getActualToken(dispatch);
                if (!token) {
                    Promise.reject(cartAuthenticateErrorMessage);
                }
                setAuthToken(token);
            }

            if (!isUserLoggedIn) {
                removeAuthToken();
            }

            const requestHeader = !isUserLoggedIn
                ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
                : { withCredentials: true };
            const body = { data: { type: `${isUserLoggedIn ? 'items' : 'guest-cart-items'}`, attributes: payload } };
            const cartType = isUserLoggedIn ? `carts/${cartId}/items` : 'guest-cart-items';
            const endpoint = cartEndpoint(cartType, isUserLoggedIn);
            const response: TApiResponseData = await api.post(endpoint, body, requestHeader);

            if (response.ok) {
                const responseParsed: ICartDataParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartAddItemFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'items.added.message',
                    type: typeNotificationSuccess
                });

            } else {
                const errorMessage = this.getParsedAPIError(response);
                errorMessageInform(errorMessage);
                dispatch(cartActions.cartAddItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async cartDeleteItem(dispatch: Function, cartId: string, sku: string, anonymId: string, isUserLoggedIn: boolean): Promise<void> {
        dispatch(cartActions.cartDeleteItemPendingStateAction());
        try {
            if (isUserLoggedIn) {
                const token = await RefreshTokenService.getActualToken(dispatch);
                setAuthToken(token);
            }

            if (!isUserLoggedIn) {
                removeAuthToken();
            }

            const requestHeader = !isUserLoggedIn
                ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
                : { withCredentials: true };
            const endpoint = isUserLoggedIn
                ? `carts/${cartId}/items/${sku}`
                : `guest-carts/${cartId}/guest-cart-items/${sku}`;

            const response: TApiResponseData = await api.delete(endpoint, {}, requestHeader);

            if (response.ok) {
                dispatch(cartActions.cartDeleteItemFulfilledStateAction({ sku }));
                NotificationsMessage({
                    id: 'items.removed.message',
                    type: typeNotificationSuccess
                });
                await CartService.getCustomerCarts(dispatch, anonymId, isUserLoggedIn);
            } else {
                const errorMessage = this.getParsedAPIError(response);
                errorMessageInform(errorMessage);
                dispatch(cartActions.cartDeleteItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartDeleteItemRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async cartUpdateItem(dispatch: Function, payload: ICartAddItem, cartId: string, anonymId: string, isUserLoggedIn: boolean): Promise<void> {
        dispatch(cartActions.cartUpdateItemPendingStateAction());
        try {
            if (isUserLoggedIn) {
                const token = await RefreshTokenService.getActualToken(dispatch);
                if (!token) {
                    Promise.reject(cartAuthenticateErrorMessage);
                }

                setAuthToken(token);
            }

            if (!isUserLoggedIn) {
                removeAuthToken();
            }

            const requestHeader = !isUserLoggedIn
                ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
                : { withCredentials: true };
            const cartType = isUserLoggedIn
                ? `carts/${cartId}/items/${payload.sku}`
                : `guest-carts/${cartId}/guest-cart-items/${payload.sku}`;

            const endpoint = cartEndpoint(cartType, isUserLoggedIn);

            const body = { data: { type: `${isUserLoggedIn ? 'items' : 'guest-cart-items'}`, attributes: payload } };
            const response: TApiResponseData = await api.patch(endpoint, body, requestHeader);

            if (response.ok) {
                const responseParsed: ICartDataParsed = parseCartResponse(response.data);
                dispatch(cartActions.cartUpdateItemFulfilledStateAction(responseParsed));
                NotificationsMessage({
                    id: 'cart.changed.quantity.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                errorMessageInform(errorMessage);
                dispatch(cartActions.cartUpdateItemRejectedStateAction(errorMessage));
            }

        } catch (error) {
            dispatch(cartActions.cartUpdateItemRejectedStateAction(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
