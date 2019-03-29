import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableProductPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableProductPage" */
            '@application/pages/ProductPage').then(
            module => module.ProductPage,
        ),
    loading: () => <div>Loading...</div>,
});
