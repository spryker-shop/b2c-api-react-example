import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutAddressStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutAddressStep').then(
            module => module.CheckoutAddressStep,
        ),
    loading: () => <Preloader />,
});
