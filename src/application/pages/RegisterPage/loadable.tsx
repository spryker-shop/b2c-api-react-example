import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableRegisterPage = Loadable({
    loader: () =>
        import('@application/pages/RegisterPage').then(
            module => module.RegisterPage,
        ),
    loading: () => <Preloader />,
});
