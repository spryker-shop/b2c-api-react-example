import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableCheckoutPage = Loadable({
    loader: () =>
        import('@pages/CheckoutPage').then(
            module => module.CheckoutPage,
        ),
    loading: () => <Preloader />,
});
