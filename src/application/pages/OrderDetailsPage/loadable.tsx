import * as React from 'react';
import Loadable from 'react-loadable';

export const LoadableOrderDetailsPage = Loadable({
    loader: () =>
        import('@application/pages/OrderDetailsPage').then(
            module => module.OrderDetailsContainer,
        ),
    loading: () => <div>Loading...</div>,
});
