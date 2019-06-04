import * as React from 'react';

export const LoadableCheckoutPaymentStep = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutPaymentStep').then(module => ({ default: module.CheckoutPaymentStep }))
);
