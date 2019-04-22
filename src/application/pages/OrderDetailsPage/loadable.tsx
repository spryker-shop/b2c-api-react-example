import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableOrderDetailsPage = Loadable({
    loader: () =>
        import('@application/pages/OrderDetailsPage').then(
            module => module.OrderDetailsContainer,
        ),
    loading: () => <Preloader />,
});
