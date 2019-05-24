import * as productRelationsActions from '@stores/actions/common/productRelations';
import { api, ApiServiceAbstract } from '@services/api';
import { TApiResponseData, EIncludeTypes } from '@services/types';
import { parsePorductRelationsResponse } from '@helpers/parsing/productRelations';
import { errorMessageInform } from '@helpers/common';

export class ProductRelationsService extends ApiServiceAbstract {
    public static endpoint(path: string): string {
        const includeParams =
            `?include=${EIncludeTypes.ABSTRACT_PRODUCT_IMAGE_SETS},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_AVAILABILITIES},` +
            `${EIncludeTypes.ABSTRACT_PRODUCT_PRICES},` +
            EIncludeTypes.PRODUCT_LABELS;

        return `${path}${includeParams}`;
    }

    public static async getProductRelations(dispatch: Function, sku: string): Promise<void> {
        dispatch(productRelationsActions.productRelationsPendingAction());
        try {
            const endpoint = this.endpoint(`abstract-products/${sku}/related-products`);
            const response: TApiResponseData = await api.get(endpoint);

            if (response.ok) {
                const parsedData = parsePorductRelationsResponse(response.data);
                dispatch(productRelationsActions.productRelationsFulfilledAction(parsedData));
            }
        } catch (error) {
            dispatch(productRelationsActions.productRelationsRejectedAction(error.message));
            errorMessageInform(error.message, false);
        }
    }

    public static async getProductRelationsCart(
        dispatch: Function,
        cartId: string,
        isUserLoggedIn?: boolean,
        anonymId?: string
    ): Promise<void> {
        dispatch(productRelationsActions.productRelationsPendingAction());
        try {
            const requestHeader = !isUserLoggedIn
                ? { withCredentials: true, headers: { 'X-Anonymous-Customer-Unique-Id': anonymId }}
                : {};
            const cartType = isUserLoggedIn ? 'carts' : 'guest-carts';
            const endpoint = this.endpoint(`${cartType}/${cartId}/up-selling-products`);
            const response: TApiResponseData = await api.get(endpoint, {}, requestHeader);

            if (response.ok) {
                const parsedData = parsePorductRelationsResponse(response.data);
                dispatch(productRelationsActions.productRelationsFulfilledAction(parsedData));
            }
        } catch (error) {
            dispatch(productRelationsActions.productRelationsRejectedAction(error.message));
            errorMessageInform(error.message, false);
        }
    }
}
