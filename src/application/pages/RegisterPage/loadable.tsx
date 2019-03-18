import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableRegisterPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@application/pages/RegisterPage').then(
            module => module.RegisterPage,
        ),
    loading: () => <div>Loading...</div>,
});
