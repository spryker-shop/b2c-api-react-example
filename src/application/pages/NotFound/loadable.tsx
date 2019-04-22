import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableNotFound = Loadable({
    loader: () =>
        import('@application/pages/NotFound').then(
            module => module.default,
        ),
    loading: () => <Preloader />,
});
