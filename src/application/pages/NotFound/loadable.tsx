import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableNotFound = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableNotFound" */
            '@application/pages/NotFound').then(
            module => module.default,
        ),
    loading: () => <div>Loading...</div>,
});
