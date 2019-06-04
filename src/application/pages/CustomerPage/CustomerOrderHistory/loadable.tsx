import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablCustomerOrderHistory = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerOrderHistory').then(
            module => module.CustomerOrderHistory,
        ),
    loading: () => <Preloader />
});
