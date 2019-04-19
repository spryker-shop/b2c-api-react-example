import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablePasswordResetPage = Loadable({
    loader: () =>
        import('@application/pages/ResetPasswordPage').then(
            module => module.ResetPasswordPage,
        ),
    loading: () => <Preloader />,
});
