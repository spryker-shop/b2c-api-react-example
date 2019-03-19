import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerPage" */
            '@application/pages/CustomerPage').then(
            module => module.CustomerPage,
        ),
    loading: () => <div>Loading...</div>,
});
