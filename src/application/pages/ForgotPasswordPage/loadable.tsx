import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadablePasswordForgotPage = Loadable({
    loader: () =>
        import('@pages/ForgotPasswordPage').then(
            module => module.ForgotPasswordPage,
        ),
    loading: () => <Preloader />,
});
