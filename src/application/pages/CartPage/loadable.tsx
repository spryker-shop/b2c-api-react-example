import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCartPage = Loadable({
    loader: () =>
        import('@application/pages/CartPage').then(
            module => module.CartPage,
        ),
    loading: () => <Preloader />,
});
