import * as cartActions from '@stores/actions/common/cart';
import { api, setAuthToken, ApiServiceAbstract, removeAuthToken } from '@services/api';
import { ICartAddItem, ICartDataParsed } from '@interfaces/cart';
import { parseCartResponse } from '@helpers/parsing';
import { cartAuthenticateErrorMessage } from '@translation/';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { EIncludeTypes, TApiResponseData, IRequestHeader } from '@services/types';
import { IRequestCreateCartBody } from '@services/common/Cart/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { errorMessageInform } from '@helpers/common';

export class CartService extends ApiServiceAbstract {
    public static cartHeader = (isUserLoggedIn: boolean, anonymId: string): IRequestHeader => !isUserLoggedIn
        ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
        : { withCredentials: true };

    public static cartEndpoint(path: string, isUserLoggedIn: boolean): string {
        const itemsIncludeType = isUserLoggedIn ? EIncludeTypes.CART_ITEMS : EIncludeTypes.GUEST_CART_ITEMS;
        const includeParams =
            `?include=${itemsIncludeType},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
            `${EIncludeTypes.CONCRETE_PRODUCTS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.CONCRETE_PRODUCT_PRICES},` +
            EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES;

        return `${path}${includeParams}`;
    }

    public static async cartTokenActions(dispatch: Function, isUserLoggedIn: boolean): Promise<void> {
        if (isUserLoggedIn) {
            const token = await RefreshTokenService.getActualToken(dispatch);

            if (!token) {
                throw new Error(cartAuthenticateErrorMessage);
            }

            setAuthToken(token);
        }

        if (!isUserLoggedIn) {
            removeAuthToken();
        }
    }

    public static async getCustomerCarts(
        dispatch: Function,
        anonymId: string = null,
        isUserLoggedIn = true,
        isCreateCart = false,
        getState?: Function
    ): Promise<void> {
        dispatch(cartActions.getCartsPendingStateAction());
        try {
            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestBody: IRequestCreateCartBody = isUserLoggedIn
                ? { data: {
                        type: 'carts',
                        attributes: {
                            priceMode: getState() ? getState().init.data.priceMode : null,
                            currency: getState() ? getState().init.data.currency : null,
                            store: getState() ? getState().init.data.store : null,
                            name: 'Cart'
                        }
                    } }
                : { data: { type:'guest-cart-items', attributes: { sku: 'dummy', quantity: 1 } } };
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const guestCartType: string = isCreateCart ? 'guest-cart-items' : 'guest-carts';
            const cartType: string = isUserLoggedIn ? 'carts' : guestCartType;
            const endpoint: string = this.cartEndpoint(cartType, isUserLoggedIn);
            const response: TApiResponseData = isCreateCart
                ? await api.post(endpoint, requestBody, requestHeader)
                : await api.get(endpoint, {}, requestHeader);
            if (response) {
                const responseParsed: ICartDataParsed = parseCartResponse({
                    data: isCreateCart ? response.data.data : response.data.data[0],
                    included: response.data.included
                });

                dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));
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

    public static async cartAddItem(
        dispatch: Function,
        payload: ICartAddItem,
        cartId: string,
        anonymId: string = null,
        isUserLoggedIn = true
    ): Promise<void> {
        dispatch(cartActions.cartAddItemPendingStateAction());
        try {
            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const body: IRequestCreateCartBody = {
                data: { type: `${isUserLoggedIn ? 'items' : 'guest-cart-items'}`, attributes: payload }
            };
            const cartType: string = isUserLoggedIn ? `carts/${cartId}/items` : 'guest-cart-items';
            const endpoint: string = this.cartEndpoint(cartType, isUserLoggedIn);
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

    public static async cartDeleteItem(
        dispatch: Function,
        cartId: string,
        sku: string,
        anonymId: string,
        isUserLoggedIn: boolean
    ): Promise<void> {
        dispatch(cartActions.cartDeleteItemPendingStateAction());
        try {
            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const endpoint: string = isUserLoggedIn
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

    public static async cartUpdateItem(
        dispatch: Function,
        payload: ICartAddItem,
        cartId: string,
        anonymId: string,
        isUserLoggedIn: boolean
    ): Promise<void> {
        dispatch(cartActions.cartUpdateItemPendingStateAction());
        try {
            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const cartType: string = isUserLoggedIn
                ? `carts/${cartId}/items/${payload.sku}`
                : `guest-carts/${cartId}/guest-cart-items/${payload.sku}`;
            const endpoint: string = this.cartEndpoint(cartType, isUserLoggedIn);
            const body: IRequestCreateCartBody = {
                data: { type: `${isUserLoggedIn ? 'items' : 'guest-cart-items'}`, attributes: payload }
            };
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
