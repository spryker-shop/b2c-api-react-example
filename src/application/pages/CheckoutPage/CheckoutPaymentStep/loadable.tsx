import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutPaymentStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutPaymentStep').then(
            module => module.CheckoutPaymentStep,
        ),
    loading: () => <div>Loading...</div>,
});
