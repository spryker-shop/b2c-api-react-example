import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCartPage = Loadable({
    loader: () =>
        import('@application/pages/CartPage').then(
            module => module.CartPage,
        ),
    loading: () => <div>Loading...</div>,
});
