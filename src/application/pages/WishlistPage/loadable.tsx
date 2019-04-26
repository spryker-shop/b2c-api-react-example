import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableWishlistPage = Loadable({
    loader: () =>
        import('@pages/WishlistPage').then(
            module => module.default,
        ),
    loading: () => <Preloader />,
});
