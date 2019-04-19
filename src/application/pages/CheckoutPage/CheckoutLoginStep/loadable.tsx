import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutLoginStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutLoginStep').then(
            module => module.CheckoutLoginStep,
        ),
    loading: () => <Preloader />,
});
