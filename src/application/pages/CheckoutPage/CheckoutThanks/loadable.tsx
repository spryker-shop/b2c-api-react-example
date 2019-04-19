import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutThanks = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutThanks').then(
            module => module.CheckoutThanks,
        ),
    loading: () => <Preloader />,
});
