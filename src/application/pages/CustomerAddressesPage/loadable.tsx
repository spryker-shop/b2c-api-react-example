import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCustomerAddressPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableCustomerAddressPage" */
            '@application/pages/CustomerAddressesPage').then(
            module => module.CustomerAddressPage
        ),
    loading: () => <div>Loading...</div>,
});
