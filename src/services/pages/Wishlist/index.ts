import { api, setAuthToken, ApiServiceAbstract } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { ADD_WISHLIST } from '@stores/actionTypes/pages/wishlist';
import { WishlistAuthenticateErrorMessage } from '@translation/';
import * as cartActions from '@stores/actions/common/cart';
import { TApiResponseData } from '@services/types';
import { IWishlistDataResponse, IRequestBody } from '@services/pages/Wishlist/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess, typeNotificationError } from '@constants/notifications';
import { parseWishlistResponse, parseWishlistItems } from '@helpers/parsing/wishlist';

export class WishlistService extends ApiServiceAbstract {
    public static async getLists(ACTION_TYPE: string, dispatch: Function): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(WishlistAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.get('wishlists', {}, {withCredentials: true});

            if (response.ok) {
                const wishlists: IWishlist[] = response.data.data.map((list: IWishlistDataResponse) =>
                    parseWishlistResponse(list));

                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: {wishlists},
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async getWishlist(ACTION_TYPE: string, dispatch: Function, wishlistId: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const query: string = 'wishlist-items,' +
                'concrete-products,' +
                'wishlist-items-products,' +
                'concrete-product-image-sets,' +
                'concrete-product-availabilities,' +
                'concrete-product-prices';

            const response: TApiResponseData = await api.get(
                `wishlists/${wishlistId}?include=${query}`,
                {},
                {withCredentials: true}
            );

            if (response.ok) {
                const wishlist: IWishlist = parseWishlistResponse(response.data.data);
                const products: IWishlistProduct[] = parseWishlistItems(response.data);

                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: {
                        data: wishlist,
                        products,
                    },
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async addWishlist(ACTION_TYPE: string, dispatch: Function, name: string): Promise<string> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestBody = {
                data: {
                    type: 'wishlists',
                    attributes: {name},
                },
            };

            const response: TApiResponseData = await api.post('wishlists', body, {withCredentials: true});

            if (response.ok) {
                NotificationsMessage({
                    id: 'wishlist.created.message',
                    type: typeNotificationSuccess
                });
                const parsedWishlist: IWishlist = parseWishlistResponse(response.data.data);
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: { data: parsedWishlist },
                });

                return parsedWishlist.id;
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: { error: errorMessage },
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });

                return '';
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });

            return '';
        }
    }

    public static async deleteWishlist(
        ACTION_TYPE: string,
        dispatch: Function,
        wishlistId: string
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: TApiResponseData = await api.delete(`wishlists/${wishlistId}`, {}, {withCredentials: true});

            if (response.ok) {
                NotificationsMessage({
                    id: 'wishlist.deleted.message',
                    type: typeNotificationSuccess
                });
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: { wishlistId },
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: { error: errorMessage },
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async updateWishlist(ACTION_TYPE: string,
                                       dispatch: Function,
                                       wishlistId: string,
                                       name: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const body: IRequestBody = {
                data: {
                    type: 'wishlists',
                    attributes: {name},
                },
            };

            const response: TApiResponseData = await api.patch(
                `wishlists/${wishlistId}`,
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: {
                        data: parseWishlistResponse(response.data.data),
                        wishlistId,
                    },
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async addItemWishlist(ACTION_TYPE: string,
                                        dispatch: Function,
                                        wishlistId: string | null,
                                        sku: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);
            let id: string | null = wishlistId;

            if (!wishlistId) {
                id = await WishlistService.addWishlist(ADD_WISHLIST, dispatch, 'My first wishlist');
            }

            if (!id) {
                Promise.reject('Wishlist doesn`t created.');
            }

            const body: IRequestBody = {
                data: {
                    type: 'wishlist-items',
                    attributes: {sku},
                },
            };

            const endpointItems = `wishlists/${id}/wishlist-items`;
            const response: TApiResponseData = await api.post(endpointItems, body, {withCredentials: true});

            if (response.ok) {
                const endpoint = `wishlists/${id}`;
                const wishlistResponse: TApiResponseData = await api.get(
                    endpoint,
                    {include: ''},
                    {withCredentials: true}
                );
                const wishlist: IWishlist = parseWishlistResponse(wishlistResponse.data.data);

                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: {data: wishlist},
                });
                NotificationsMessage({
                    messageWithCustomText: 'wishlist.add.product.message',
                    message: wishlist.name,
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async deleteItemWishlist(ACTION_TYPE: string,
                                           dispatch: Function,
                                           wishlistId: string,
                                           sku: string): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: TApiResponseData = await api.delete(
                `wishlists/${wishlistId}/wishlist-items/${sku}`,
                {},
                {withCredentials: true}
            );

            if (response.ok) {
                NotificationsMessage({
                    id: 'wishlist.removed.items.message',
                    type: typeNotificationSuccess
                });
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistProductFulfilled: {
                        wishlistId,
                        sku,
                    },
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch({
                    type: ACTION_TYPE + '_REJECTED',
                    payloadRejected: {error: errorMessage},
                });
                NotificationsMessage({
                    messageWithCustomText: 'request.error.message',
                    message: errorMessage,
                    type: typeNotificationError
                });
            }

        } catch (error) {
            dispatch({
                type: ACTION_TYPE + '_REJECTED',
                payloadRejected: {error: error.message},
            });
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }

    public static async removeMultiItems(
        dispatch: Function,
        wishlistId: string,
        productsList: string[]
    ): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            for (const sku of productsList) {
                await api.delete(
                    `wishlists/${wishlistId}/wishlist-items/${sku}`,
                    {},
                    {withCredentials: true}
                );
            }

            await WishlistService.getWishlist('DETAIL_WISHLIST', dispatch, wishlistId);
        } catch (error) {
            dispatch(cartActions.cartAddItemRejectedStateAction(error.message));
            NotificationsMessage({
                messageWithCustomText: 'unexpected.error.message',
                message: error.message,
                type: typeNotificationError
            });
        }
    }
}
