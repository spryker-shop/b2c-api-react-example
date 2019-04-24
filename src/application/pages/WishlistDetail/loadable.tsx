import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableWishlistDetail = Loadable({
    loader: () =>
        import('@pages/WishlistDetail').then(
            module => module.default,
        ),
    loading: () => <Preloader />,
});
