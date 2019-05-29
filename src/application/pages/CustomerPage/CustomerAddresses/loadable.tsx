import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerAddresses = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerAddresses').then(
            module => module.CustomerAddresses,
        ),
    loading: () => <Preloader />,
});
