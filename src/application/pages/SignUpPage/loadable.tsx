import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableSignUpPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@application/pages/SignUpPage').then(
            module => module.SignUpPage,
        ),
    loading: () => <div>Loading...</div>,
});
