import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableCheckoutSummaryStep = Loadable({
    loader: () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "LoadableLoginPage" */
            '@pages/CheckoutPage/CheckoutSummaryStep').then(
            module => module.CheckoutSummaryStep,
        ),
    loading: () => <div>Loading...</div>,
});
