import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCartPage = Loadable({
    loader: () =>
        import('@application/pages/CartPage').then(
            module => module.CartPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
