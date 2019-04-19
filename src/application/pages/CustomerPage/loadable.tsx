import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCustomerPage = Loadable({
    loader: () =>
        import('@pages/CustomerPage').then(
            module => module.CustomerPage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
