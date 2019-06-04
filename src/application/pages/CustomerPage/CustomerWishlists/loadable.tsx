import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablCustomerWishlists = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerWishlists').then(
            module => module.CustomerWishlists,
        ),
    loading: () => <Preloader />
});
