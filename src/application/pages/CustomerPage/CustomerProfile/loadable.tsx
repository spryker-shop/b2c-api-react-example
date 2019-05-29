import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablCustomerProfile = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerProfile').then(
            module => module.CustomerProfile,
        ),
    loading: () => <Preloader />
});
