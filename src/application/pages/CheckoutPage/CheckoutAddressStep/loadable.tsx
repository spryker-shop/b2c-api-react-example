import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutAddressStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutAddressStep').then(
            module => module.CheckoutAddressStep,
        ),
    loading: () => <div>Loading...</div>,
});
