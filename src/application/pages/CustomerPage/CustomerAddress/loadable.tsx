import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerAddress = Loadable({
    loader: () =>
        import('@pages/CustomerPage/CustomerAddress').then(
            module => module.CustomerAddress,
        ),
    loading: () => <Preloader />,
});
