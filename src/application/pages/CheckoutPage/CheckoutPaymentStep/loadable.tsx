import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutPaymentStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutPaymentStep').then(
            module => module.CheckoutPaymentStep,
        ),
    loading: () => <Preloader />,
});
