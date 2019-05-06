import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCustomerOverviewPage = Loadable({
    loader: () =>
        import('@pages/CustomerOverviewPage').then(
            module => module.CustomerOverviewPage
        ),
    loading: () => <Preloader />,
});
