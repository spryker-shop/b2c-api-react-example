import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableOrderHistoryPage = Loadable({
    loader: () =>
        import('@application/pages/OrderHistoryPage').then(
            module => module.OrderHistory,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
