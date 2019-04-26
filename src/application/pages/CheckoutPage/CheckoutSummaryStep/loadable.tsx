import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutSummaryStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutSummaryStep').then(
            module => module.CheckoutSummaryStep,
        ),
    loading: () => <Preloader />,
});
