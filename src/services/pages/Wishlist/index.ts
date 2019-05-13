import api, { setAuthToken } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { ADD_WISHLIST } from '@stores/actionTypes/pages/wishlist';
import { WishlistAuthenticateErrorMessage } from '@translation/';
import { ApiServiceAbstract } from '@services/apiAbstractions/ApiServiceAbstract';
import * as cartActions from '@stores/actions/common/cart';
import { IApiResponseData } from '@services/types';
import {
    IWishlistRawData,
    IWishlistRawResponse,
    TRowWishlistIncludedResponse
} from '@services/pages/Wishlist/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import {
    typeNotificationSuccess,
    typeNotificationError
} from '@constants/notifications';
import { IProductPricesItem } from '@interfaces/product';

interface IRequestBody {
    data: {
        type: string;
        include?: string;
        attributes: {};
    };
}

export class WishlistService extends ApiServiceAbstract {
    public static async getLists(ACTION_TYPE: string, dispatch: Function): Promise<void> {
        try {
            const token = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                throw new Error(WishlistAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: IApiResponseData = await api.get('wishlists', {}, {withCredentials: true});

            if (response.ok) {
                const wishlists: IWishlist[] = response.data.data.map((
                    list: IWishlistRawData
                ) => WishlistService.parseWishlistResponse(list));

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

            const response: IApiResponseData = await api.get(
                `wishlists/${wishlistId}?include=${query}`,
                {},
                {withCredentials: true}
            );

            if (response.ok) {
                let products: IWishlistProduct[] = [];
                const wishlist: IWishlist = WishlistService.parseWishlistResponse(response.data.data);

                if (response.data.included) {
                    products = WishlistService.parseWishlistItems(response.data.included);
                }

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

            const response: IApiResponseData = await api.post('wishlists', body, {withCredentials: true});

            if (response.ok) {
                NotificationsMessage({
                    id: 'wishlist.created.message',
                    type: typeNotificationSuccess
                });
                const parsedWishlist: IWishlist = WishlistService.parseWishlistResponse(response.data.data);
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

            const response: IApiResponseData = await api.delete(`wishlists/${wishlistId}`, {}, {withCredentials: true});

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

            const response: IApiResponseData = await api.patch(
                `wishlists/${wishlistId}`,
                body,
                {withCredentials: true}
            );

            if (response.ok) {
                dispatch({
                    type: ACTION_TYPE + '_FULFILLED',
                    payloadWishlistDataFulfilled: {
                        data: WishlistService.parseWishlistResponse(response.data.data),
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
                throw new Error('Wishlist doesn`t created.');
            }

            const body: IRequestBody = {
                data: {
                    type: 'wishlist-items',
                    attributes: {sku},
                },
            };

            const endpointItems = `wishlists/${id}/wishlist-items`;
            const response: IApiResponseData = await api.post(endpointItems, body, {withCredentials: true});

            if (response.ok) {
                const endpoint = `wishlists/${id}`;
                const wishlistResponse: IApiResponseData = await api.get(
                    endpoint,
                    {include: ''},
                    {withCredentials: true}
                );
                const wishlist: IWishlist = WishlistService.parseWishlistResponse(wishlistResponse.data.data);

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

            const response: IApiResponseData = await api.delete(
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

    private static parseWishlistResponse(data: IWishlistRawData): IWishlist {
        const wishlist: IWishlist = {
            id: data.id,
            name: data.attributes.name,
            numberOfItems: data.attributes.numberOfItems || 0,
            createdAt: data.attributes.createdAt,
            updatedAt: data.attributes.updatedAt,
        };

        return wishlist;
    }

    private static parseWishlistItems(included: IWishlistRawResponse['included']): IWishlistProduct[] {
        const items: {[key: string]: IWishlistProduct} = {};

        included.forEach((row: TRowWishlistIncludedResponse) => {
            if (!items[row.id]) {
                items[row.id] = {attributes: [], image: ''} as IWishlistProduct;
            }

            if (row.type === 'concrete-product-image-sets') {
                if (
                    row.attributes.imageSets &&
                    row.attributes.imageSets.length &&
                    row.attributes.imageSets[0].images &&
                    row.attributes.imageSets[0].images.length
                ) {
                    items[row.id].image = row.attributes.imageSets[0].images[0].externalUrlSmall;
                }

                return;
            }

            if (row.type === 'concrete-products') {
                items[row.id].sku = row.attributes.sku;
                items[row.id].name = row.attributes.name;
                Object.keys(row.attributes.attributes).forEach((attr: string) => {
                    if (row.attributes.superAttributesDefinition.includes(attr)) {
                        const attributeKey: string = String(attr);
                        const attributeValue: string = String(row.attributes.attributes[attr]);
                        items[row.id].attributes.push({[attributeKey]: attributeValue});
                    }
                });

                return;
            }

            if (row.type === 'concrete-product-prices') {
                items[row.id].prices = {};
                row.attributes.prices.forEach((price: IProductPricesItem) => {
                    const priceType = price.priceTypeName;
                    const priceName = priceType.charAt(0).toLocaleUpperCase() +
                        priceType.slice(1).toLocaleLowerCase();

                    items[row.id].prices[`grossAmount${priceName}`] = price.grossAmount;
                    items[row.id].prices[`netAmount${priceName}`] = price.netAmount;
                });

                return;
            }

            if (row.type === 'concrete-product-availabilities') {
                items[row.id].availability = row.attributes.availability;

                if (row.attributes.isNeverOutOfStock) {
                    items[row.id].availability = true;
                }
            }
        });

        return Object.values(items);
    }
}
