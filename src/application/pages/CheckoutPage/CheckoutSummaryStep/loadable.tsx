import * as React from 'react';

export const LoadableCheckoutSummaryStep = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutSummaryStep').then(module => ({ default: module.CheckoutSummaryStep }))
);
