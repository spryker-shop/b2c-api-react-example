import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerPage = Loadable({
    loader: () =>
        import('@application/pages/CustomerPage').then(
            module => module.CustomerPage,
        ),
    loading: () => <Preloader />,
});
