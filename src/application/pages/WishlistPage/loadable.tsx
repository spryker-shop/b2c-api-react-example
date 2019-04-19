import * as React from 'react';
import Loadable from 'react-loadable'
import { FormattedMessage } from 'react-intl';;

export const LoadableWishlistPage = Loadable({
    loader: () =>
        import('@pages/WishlistPage').then(
            module => module.default,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
