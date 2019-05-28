import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableNotFound = Loadable({
    loader: () =>
        import('@pages/NotFoundPage').then(
            module => module.NotFoundPage,
        ),
    loading: () => <Preloader />,
});
