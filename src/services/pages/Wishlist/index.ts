import * as wishlistActions from '@stores/actions/pages/wishlist';
import { api, setAuthToken } from '@services/api';
import { RefreshTokenService } from '@services/common/RefreshToken';
import { IWishlist, IWishlistProduct } from '@interfaces/wishlist';
import { wishlistAuthenticateErrorMessage, firstWishlistName } from '@translation/';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { IRequestBody, IWishlistDataResponse } from '@services/pages/Wishlist/types';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';
import { parseWishlistResponse, parseWishlistItems } from '@helpers/parsing/wishlist';
import { WishlistActionsService } from './wishlistActions';
import { errorMessageInform } from '@helpers/common';

export class WishlistService extends WishlistActionsService {
    public static async getWishlists(dispatch: Function): Promise<void> {
        dispatch(wishlistActions.getWishlistsPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            if (!token) {
                Promise.reject(wishlistAuthenticateErrorMessage);
            }
            setAuthToken(token);
            const response: TApiResponseData = await api.get('wishlists', {}, {withCredentials: true});

            if (response.ok) {
                const wishlists: IWishlist[] = response.data.data.map((list: IWishlistDataResponse) =>
                    parseWishlistResponse(list));
                dispatch(wishlistActions.getWishlistsFulfilledState(wishlists));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.getWishlistsRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.getWishlistsRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async getDetailWishlist(dispatch: Function, wishlistId: string): Promise<void> {
        dispatch(wishlistActions.getDetailWishlisPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const query: string = `${EIncludeTypes.WISHLIST_ITEMS},` +
                `${EIncludeTypes.CONCRETE_PRODUCTS},` +
                `${EIncludeTypes.CONCRETE_PRODUCT_IMAGE_SETS},` +
                `${EIncludeTypes.CONCRETE_PRODUCT_AVAILABILITIES},` +
                EIncludeTypes.CONCRETE_PRODUCT_PRICES;

            const response: TApiResponseData = await api.get(
                `wishlists/${wishlistId}?include=${query}`,
                {},
                {withCredentials: true}
            );

            if (response.ok) {
                const wishlist: IWishlist = parseWishlistResponse(response.data.data);
                const products: IWishlistProduct[] = parseWishlistItems(response.data);
                dispatch(wishlistActions.getDetailWishlisFulfilledState(wishlist, products));
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.getDetailWishlisRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.getDetailWishlisRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async addItemWishlist(dispatch: Function, wishlistId: string | null, sku: string): Promise<void> {
        dispatch(wishlistActions.addItemWishlistPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);
            let id: string | null = wishlistId;

            if (!wishlistId) {
                id = await WishlistService.addWishlist(dispatch, firstWishlistName);
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

            const endpointItems: string = `wishlists/${id}/wishlist-items`;
            const response: TApiResponseData = await api.post(endpointItems, body, {withCredentials: true});

            if (response.ok) {
                const endpoint = `wishlists/${id}`;
                const wishlistResponse: TApiResponseData = await api.get(
                    endpoint,
                    {include: ''},
                    {withCredentials: true}
                );
                const wishlist: IWishlist = parseWishlistResponse(wishlistResponse.data.data);
                dispatch(wishlistActions.addItemWishlistFulfilledState(wishlist));
                NotificationsMessage({
                    messageWithCustomText: 'wishlist.add.product.message',
                    message: wishlist.name,
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.addItemWishlistRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.addItemWishlistRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async deleteItemWishlist(dispatch: Function, wishlistId: string, sku: string): Promise<void> {
        dispatch(wishlistActions.deleteItemWishlistPendingState());
        try {
            const token: string = await RefreshTokenService.getActualToken(dispatch);
            setAuthToken(token);

            const response: TApiResponseData = await api.delete(
                `wishlists/${wishlistId}/wishlist-items/${sku}`,
                {},
                {withCredentials: true}
            );

            if (response.ok) {
                await WishlistService.getDetailWishlist(dispatch, wishlistId);
                dispatch(wishlistActions.deleteItemWishlistFulfilledState(wishlistId, sku));
                NotificationsMessage({
                    id: 'wishlist.removed.items.message',
                    type: typeNotificationSuccess
                });
            } else {
                const errorMessage = this.getParsedAPIError(response);
                dispatch(wishlistActions.deleteItemWishlistRejectedState(errorMessage));
                errorMessageInform(errorMessage);
            }

        } catch (error) {
            dispatch(wishlistActions.deleteItemWishlistRejectedState(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
