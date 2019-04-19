import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutPage = Loadable({
    loader: () =>
        import('@application/pages/CheckoutPage').then(
            module => module.CheckoutPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
