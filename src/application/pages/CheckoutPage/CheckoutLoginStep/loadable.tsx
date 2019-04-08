import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutLoginStep = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@pages/CheckoutPage/CheckoutLoginStep').then(
            module => module.CheckoutLoginStep,
        ),
    loading: () => <div>Loading...</div>,
});
