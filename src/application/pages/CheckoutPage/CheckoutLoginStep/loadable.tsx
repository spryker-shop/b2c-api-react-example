import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutLoginStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutLoginStep').then(
            module => module.CheckoutLoginStep,
        ),
    loading: () => <div>Loading...</div>,
});
