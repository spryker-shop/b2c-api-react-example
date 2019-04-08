import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutShipmentStep = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@pages/CheckoutPage/CheckoutShipmentStep').then(
            module => module.CheckoutShipmentStep,
        ),
    loading: () => <div>Loading...</div>,
});
