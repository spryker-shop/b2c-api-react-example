import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadablePasswordResetPage = Loadable({
    loader: () =>
        import('@application/pages/ResetPasswordPage').then(
            module => module.ResetPasswordPage,
        ),
    loading: () => <div>Loading...</div>,
});
