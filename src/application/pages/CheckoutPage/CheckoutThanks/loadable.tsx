import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutThanks = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutThanks').then(
            module => module.CheckoutThanks,
        ),
    loading: () => <div>Loading...</div>,
});
