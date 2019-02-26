import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableLoginPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@application/pages/LoginPage').then(
            module => module.LoginPageComponent,
        ),
    loading: () => <div>Loading...</div>,
});
