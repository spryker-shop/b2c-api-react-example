import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablCustomerOverview = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerOverview').then(
            module => module.CustomerOverview,
        ),
    loading: () => <Preloader />
});
