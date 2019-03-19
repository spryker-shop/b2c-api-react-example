import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerProfilePage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerProfilePage" */
            '@application/pages/CustomerProfilePage').then(
            module => module.CustomerProfilePage,
        ),
    loading: () => <div>Loading...</div>,
});
