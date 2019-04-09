import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableNotFound = Loadable({
    loader: () =>
        import('@application/pages/NotFound').then(
            module => module.default,
        ),
    loading: () => <div>Loading...</div>,
});
