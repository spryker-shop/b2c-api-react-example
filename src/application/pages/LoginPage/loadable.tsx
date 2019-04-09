import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableLoginPage = Loadable({
    loader: () =>
        import('@application/pages/LoginPage').then(
            module => module.LoginPage,
        ),
    loading: () => <div>Loading...</div>,
});
