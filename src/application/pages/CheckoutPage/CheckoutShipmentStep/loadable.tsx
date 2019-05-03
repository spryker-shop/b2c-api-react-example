import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutShipmentStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutShipmentStep').then(
            module => module.CheckoutShipmentStep,
        ),
    loading: () => <Preloader />,
});
