import * as React from 'react';

export const LoadableHomePage = React.lazy(() =>
    import('@pages/HomePage').then(module => ({ default: module.HomePage }))
);
