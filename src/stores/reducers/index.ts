import { isPageLoginStateLoading, pagesLogin } from '@stores/reducers/pages/login';
import { isPageSearchStateLoading, pageSearch } from '@stores/reducers/pages/search';
import { isPageProductStateLoading, pageProduct } from '@stores/reducers/pages/product';
import { pageWishlist } from '@stores/reducers/pages/wishlist';
import { isPageWishlistStateLoading } from '@stores/reducers/pages/wishlist/selectors';
import { pageAddresses } from '@stores/reducers/pages/addresses';
import { isPageCustomerProfileLoading, pageCustomerProfile } from '@stores/reducers/pages/customerProfile';
import { pageCheckout } from '@stores/reducers/pages/checkout';
import { isPageCheckoutStateLoading } from '@stores/reducers/pages/checkout/selectors';
import { cart } from '@stores/reducers/common/cart';
import { isAppLoading } from '@stores/reducers/common/init/selectors';
import { init } from '@stores/reducers/common/init';
import { navigations } from '@stores/reducers/common/navigations';
import { isOrderHistoryLoading, orderHistory } from '@stores/reducers/pages/orderHistory';
import { isOrderDetailsLoading, orderDetails } from '@stores/reducers/pages/orderDetails';
import { isCartStateLoading } from '@stores/reducers/common/cart/selectors';
import { IReduxStore, IReduxOwnProps } from '@stores/reducers/types';
import { isPageAddressesStateLoading } from '@stores/reducers/pages/addresses/selectors';
import { productRelations } from '@stores/reducers/common/productRelations';

export const reducers = {
    pagesLogin,
    pageSearch,
    pageProduct,
    productRelations,
    pageWishlist,
    pageAddresses,
    pageCheckout,
    cart,
    init,
    orderHistory,
    orderDetails,
    pageCustomerProfile,
    navigations
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
