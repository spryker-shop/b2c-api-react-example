import { IWishlist } from '@interfaces/wishlist';
import {
    IProductsConcreteRowIncludedResponse,
    IProductRowAvailabilitiesIncludedResponse,
    IProductRowImageSetsIncludedResponse,
    IProductRowPricesIncludedResponse,
    IAbstractRowIncludedResponse,
    IRelationshipsResponse
} from '@services/types';

export interface IWishlistRawResponse {
    data: IWishlistDataResponse;
    included: TWishlistRowIncludedResponse[];
}

interface IWishlistDataResponse extends IAbstractRowIncludedResponse, IRelationshipsResponse {
    attributes: IWishlist;
}

export type TWishlistRowIncludedResponse = IProductRowImageSetsIncludedResponse
    | IProductRowAvailabilitiesIncludedResponse | IProductRowPricesIncludedResponse
    | IProductsConcreteRowIncludedResponse;

export interface IRequestBody {
    data: {
        type: string;
        include?: string;
        attributes: {};
    };
}
