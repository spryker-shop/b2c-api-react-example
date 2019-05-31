import * as React from 'react';

export const LoadableSearchPage = React.lazy(() =>
    import('@pages/SearchPage').then(module => ({ default: module.SearchPage }))
);
