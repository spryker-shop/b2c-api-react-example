import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCustomerAddressPage = Loadable({
    loader: () =>
        import('@application/pages/CustomerAddressesPage').then(
            module => module.CustomerAddressPage
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
