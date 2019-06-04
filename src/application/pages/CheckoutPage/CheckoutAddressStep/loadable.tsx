import * as React from 'react';

export const LoadableCheckoutAddressStep = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutAddressStep').then(module => ({ default: module.CheckoutAddressStep }))
);
