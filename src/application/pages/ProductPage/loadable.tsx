import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableProductPage = Loadable({
    loader: () =>
        import('@application/pages/ProductPage').then(
            module => module.ProductPage,
        ),
    loading: () => <div>Loading...</div>,
});
