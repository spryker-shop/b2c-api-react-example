import { ILoginState } from '@stores/reducers/pages/login/types';
import { ISearchState } from '@stores/reducers/pages/search/types';
import { IProductState } from '@stores/reducers/pages/product/types';
import { IWishlistState } from '@stores/reducers/pages/wishlist/types';
import { IAddressesState } from '@stores/reducers/pages/addresses/types';
import { ICheckoutState } from '@stores/reducers/pages/checkout/types';
import { ICartState } from '@stores/reducers/common/cart/types';
import { INavigationsState } from '@stores/reducers/common/navigations/types';
import { IOrderHistoryState } from '@stores/reducers/pages/orderHistory/types';
import { IOrderDetailsState } from '@stores/reducers/pages/orderDetails/types';
import { ICustomerState } from '@stores/reducers/pages/customerProfile/types';
import { RouteProps } from 'react-router';
import { IIndexSignature, WithRouter } from '@interfaces/common';
import { IInitState } from '@stores/reducers/common/init/types';
import { IApiErrorResponse } from '@services/types';
import { IProductRelationsState } from '@stores/reducers/common/productRelations/types';

export interface IReduxState {
    dispatch?: Function;
    error?: string;
    pending?: boolean;
    fulfilled?: boolean;
    rejected?: boolean;
    initiated?: boolean;
}

export interface IReduxStore {
    pagesLogin: ILoginState;
    pageSearch: ISearchState;
    pageProduct: IProductState;
    pageWishlist: IWishlistState;
    pageAddresses: IAddressesState;
    pageCheckout: ICheckoutState;
    cart: ICartState;
    init: IInitState;
    orderHistory: IOrderHistoryState;
    orderDetails: IOrderDetailsState;
    pageCustomerProfile: ICustomerState;
    productRelations: IProductRelationsState;
    navigations: INavigationsState;
}

export interface IReduxOwnProps extends RouteProps, WithRouter {
    classes?: IIndexSignature;
    match?: {
        path: string;
        url: string;
        params: IIndexSignature;
        isExact: boolean;
    };
}

export interface IActionData {
    type: string;
    payloadRejected?: IApiErrorResponse;
}
