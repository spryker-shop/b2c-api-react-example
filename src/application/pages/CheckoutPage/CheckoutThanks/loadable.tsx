import * as React from 'react';

export const LoadableCheckoutThanks = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutThanks').then(module => ({ default: module.CheckoutThanks }))
);
