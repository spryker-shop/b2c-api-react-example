import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableProductPage = Loadable({
    loader: () =>
        import('@pages/ProductPage').then(
            module => module.ProductPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
