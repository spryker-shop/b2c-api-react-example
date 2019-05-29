import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablCustomerWishlistDetail = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerWishlistDetail').then(
            module => module.CustomerWishlistDetail,
        ),
    loading: () => <Preloader />
});
