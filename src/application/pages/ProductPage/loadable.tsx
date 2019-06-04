import * as React from 'react';

export const LoadableProductPage = React.lazy(() =>
    import('@pages/ProductPage').then(module => ({ default: module.ProductPage }))
);
