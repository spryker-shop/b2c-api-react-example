import * as React from 'react';

export const LoadableCheckoutShipmentStep = React.lazy(() =>
    import('@pages/CheckoutPage/CheckoutShipmentStep').then(module => ({ default: module.CheckoutShipmentStep }))
);
