import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableOrderDetailsPage = Loadable({
    loader: () =>
        import('@application/pages/OrderDetailsPage').then(
            module => module.OrderDetailsContainer,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
