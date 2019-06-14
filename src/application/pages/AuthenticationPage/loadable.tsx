import * as React from 'react';

export const LoadableAuthenticationPage = React.lazy(() =>
    import('@pages/AuthenticationPage').then(module => ({ default: module.AuthenticationPage }))
);
