import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerProfilePage = Loadable({
    loader: () =>
        import('@pages/CustomerProfilePage').then(
            module => module.CustomerProfilePage,
        ),
    loading: () => <Preloader />,
});
