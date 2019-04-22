import * as React from 'react';
import Loadable from 'react-loadable';
import { Preloader } from '@components/Preloader';

export const LoadableOrderHistoryPage = Loadable({
    loader: () =>
        import('@pages/OrderHistoryPage').then(
            module => module.OrderHistoryContainer,
        ),
    loading: () => <Preloader />,
});
