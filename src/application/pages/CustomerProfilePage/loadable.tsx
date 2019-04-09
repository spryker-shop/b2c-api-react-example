import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerProfilePage = Loadable({
    loader: () =>
        import('@application/pages/CustomerProfilePage').then(
            module => module.CustomerProfilePage,
        ),
    loading: () => <div>Loading...</div>,
});
