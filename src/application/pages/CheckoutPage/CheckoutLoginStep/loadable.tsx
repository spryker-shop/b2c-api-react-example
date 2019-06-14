import * as React from 'react';

export const LoadableCheckoutLoginStep = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutLoginStep').then(module => ({ default: module.CheckoutLoginStep }))
);
