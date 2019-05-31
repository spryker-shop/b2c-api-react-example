import * as React from 'react';

export const LoadableCheckoutPage = React.lazy(() =>
    import('@pages/CheckoutPage').then(module => ({ default: module.CheckoutPage }))
);
