import { isPageLoginStateLoading, pagesLogin } from './pages/login';
import { isPageSearchStateLoading, pageSearch } from './pages/search';
import { isPageProductStateLoading, pageProduct } from './pages/product';
import { pageWishlist } from './pages/wishlist';
import { isPageWishlistStateLoading } from './pages/wishlist/selectors';
import { pageAddresses } from './pages/addresses';
import { isPageCustomerProfileLoading, pageCustomerProfile } from './pages/customerProfile';
import { pageCheckout } from './pages/checkout';
import { isPageCheckoutStateLoading } from './pages/checkout/selectors';
import { cart } from './common/cart';
import { init, isAppLoading } from './common/init';
import { isOrderHistoryLoading, orderHistory } from './pages/orderHistory';
import { isOrderDetailsLoading, orderDetails } from './pages/orderDetails';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxStore, IReduxOwnProps } from '@stores/reducers/types';
import { isPageAddressesStateLoading } from '@stores/reducers/pages/addresses/selectors';

export const reducers = {
    pagesLogin,
    pageSearch,
    pageProduct,
    pageWishlist,
    pageAddresses,
    pageCheckout,
    cart,
    init,
    orderHistory,
    orderDetails,
    pageCustomerProfile,
};

export function isStateLoading(state: IReduxStore, props: IReduxOwnProps): boolean {
    return Boolean(
        isPageProductStateLoading(state, props)
        || isPageLoginStateLoading(state, props)
        || isCartStateLoading(state, props)
        || isPageSearchStateLoading(state, props)
        || isAppLoading(state, props)
        || isPageWishlistStateLoading(state, props)
        || isOrderHistoryLoading(state, props)
        || isOrderDetailsLoading(state, props)
        || isPageCustomerProfileLoading(state, props)
        || isPageAddressesStateLoading(state, props)
        || isPageCheckoutStateLoading(state, props)
    );
}
