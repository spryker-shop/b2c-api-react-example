import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadablePasswordResetPage = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadablePasswordReset" */
            '@application/pages/ResetPasswordPage').then(
            module => module.ResetPasswordPage,
        ),
    loading: () => <div>Loading...</div>,
});
