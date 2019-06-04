import * as React from 'react';

export const LoadableNotFoundPage = React.lazy(() =>
    import('@pages/NotFoundPage').then(module => ({ default: module.NotFoundPage }))
);
