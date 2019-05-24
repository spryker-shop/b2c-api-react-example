import { IWishlist } from '@interfaces/wishlist';
import {
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse
} from '@services/types';

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

export type TRowWishlistIncludedResponse = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse
    | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse;

export interface IRequestBody {
    data: {
        type: string;
        include?: string;
        attributes: {};
    };
}
