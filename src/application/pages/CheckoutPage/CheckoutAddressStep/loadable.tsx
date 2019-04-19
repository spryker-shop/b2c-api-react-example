import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutAddressStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutAddressStep').then(
            module => module.CheckoutAddressStep,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
