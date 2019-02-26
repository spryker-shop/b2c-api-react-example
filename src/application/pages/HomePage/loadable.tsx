import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableHomePage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableHomePage" */
            '@application/pages/HomePage').then(
            module => module.HomePageComponent,
        ),
    loading: () => <div style={{minHeight: '100vh', textAlign: 'center'}}>Loading...</div>,
});
