import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablWishlistDetailPage = Loadable({
    loader: () =>
        import('@pages/WishlistDetailPage').then(
            module => module.WishlistDetailPage,
        ),
    loading: () => <Preloader />
});
