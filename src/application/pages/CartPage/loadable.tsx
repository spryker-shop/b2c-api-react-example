import * as React from 'react';

export const LoadableCartPage = React.lazy(() =>
    import('@pages/CartPage').then(module => ({ default: module.CartPage }))
);
