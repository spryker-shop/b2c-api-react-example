/* tslint:disable:max-file-line-count */
import * as cartActions from '@stores/actions/common/cart';
import { api, setAuthToken, ApiServiceAbstract, removeAuthToken } from '@services/api';
import { ICartAddItem, ICartDataParsed } from '@interfaces/cart';
import { parseCartResponse } from '@helpers/parsing';
import { cartAuthenticateErrorMessage } from '@translation/';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { EIncludeTypes, TApiResponseData, IRequestHeader } from '@services/types';
import { ICartDataResponse, IRequestCreateCartBody } from '@services/common/Cart/types';
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
    ): Promise<string | void> {
        dispatch(cartActions.getCartsPendingStateAction());
        try {
            if (isCreateCart && !isUserLoggedIn) {
                dispatch(cartActions.getCartsFulfilledStateAction(null));

                return;
            }

            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestBody: IRequestCreateCartBody | boolean = isCreateCart && {
                data: {
                    type: 'carts',
                    attributes: {
                        priceMode: getState().init.data.priceMode,
                        currency: getState().init.data.currency,
                        store: getState().init.data.store,
                        name: 'Cart'
                    }
                }
            };
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const cartType: string = isUserLoggedIn ? 'carts' : 'guest-carts';
            const endpoint: string = this.cartEndpoint(cartType, isUserLoggedIn);
            const response: TApiResponseData = isCreateCart
                ? await api.post(endpoint, requestBody, requestHeader)
                : await api.get(endpoint, {}, requestHeader);

            const responseCartDataSorting = (responseData: ICartDataResponse[]): ICartDataResponse => {
                const cartId: string = responseData.reduce((accumulator: string[], item: ICartDataResponse) =>
                    [...accumulator, item.id], []).sort()[0];

                return responseData.filter((item: ICartDataResponse) => item.id === cartId)[0];
            };

            if (response) {
                const responseData = response.data.data;
                const responseParsed: ICartDataParsed = parseCartResponse({
                    data: isCreateCart ? responseData : responseCartDataSorting(responseData),
                    included: response.data.included
                });

                dispatch(cartActions.getCartsFulfilledStateAction(responseParsed));

                return isCreateCart
                    ? Boolean(responseData.length) && responseData.id
                    : Boolean(responseData.length) && responseCartDataSorting(responseData).id;
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
        isUserLoggedIn = true,
        getState: Function
    ): Promise<void> {
        const currentCartId: string | void = Boolean(cartId)
            ? cartId
            : await this.getCustomerCarts(dispatch, anonymId, isUserLoggedIn, true, getState);
        dispatch(cartActions.cartAddItemPendingStateAction());
        try {
            await this.cartTokenActions(dispatch, isUserLoggedIn);
            const requestHeader: IRequestHeader = this.cartHeader(isUserLoggedIn, anonymId);
            const body: IRequestCreateCartBody = {
                data: { type: `${isUserLoggedIn ? 'items' : 'guest-cart-items'}`, attributes: payload }
            };
            const cartType: string = isUserLoggedIn ? `carts/${currentCartId}/items` : 'guest-cart-items';
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
