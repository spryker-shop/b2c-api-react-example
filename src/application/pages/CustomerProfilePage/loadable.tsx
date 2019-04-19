import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCustomerProfilePage = Loadable({
    loader: () =>
        import('@pages/CustomerProfilePage').then(
            module => module.CustomerProfilePage,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
