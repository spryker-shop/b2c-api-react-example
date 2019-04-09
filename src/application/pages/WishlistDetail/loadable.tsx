import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableWishlistDetail = Loadable({
    loader: () =>
        import('@application/pages/WishlistDetail').then(
            module => module.default,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
