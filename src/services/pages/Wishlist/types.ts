import { IWishlist } from '@interfaces/wishlist';
import {
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse
} from '@services/pages/Product/types';

export interface IWishlistRawResponse {
    data: IWishlistRawData[];
    id: string;
    included?: TRowWishlistIncludedResponse[];
}

export interface IWishlistRawData {
    attributes: IWishlist;
    id: string;
    links: {
        self: string;
    };
    type: string;
}

export enum ECommonIncludeTypes {
    CONCRETE_PRODUCT_IMAGE_SETS = 'concrete-product-image-sets',
    CONCRETE_CONCRETE_PRODUCTS = 'concrete-products',
    CONCRETE_PRODUCT_PRICES = 'concrete-product-prices',
    CONCRETE_PRODUCT_AVAILABILITIES = 'concrete-product-availabilities',
    WISHLIST_ITEMS = 'wishlist-items'
}

export type TRowWishlistIncludedResponse = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse;
