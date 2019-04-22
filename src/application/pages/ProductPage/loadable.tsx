import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableProductPage = Loadable({
    loader: () =>
        import('@application/pages/ProductPage').then(
            module => module.ProductPage,
        ),
    loading: () => <Preloader />,
});
