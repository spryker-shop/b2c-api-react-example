import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerAddressesPage = Loadable({
    loader: () =>
        import('@pages/CustomerAddressesPage').then(
            module => module.CustomerAddressesPage,
        ),
    loading: () => <Preloader />,
});
