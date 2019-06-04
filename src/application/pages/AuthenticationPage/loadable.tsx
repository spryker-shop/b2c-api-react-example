import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableAuthenticationPage = Loadable({
    loader: () =>
        import('@pages/AuthenticationPage').then(
            module => module.AuthenticationPage,
        ),
    loading: () => <Preloader />,
});
