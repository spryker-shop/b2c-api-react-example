import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableHomePage = Loadable({
    loader: () =>
        import('@application/pages/HomePage').then(
            module => module.HomePage,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
