import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablWishlistPage = Loadable({
    loader: () =>
        import('@pages/WishlistPage').then(
            module => module.WishlistPage,
        ),
    loading: () => <Preloader />
});
