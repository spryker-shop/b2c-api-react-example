import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutPaymentStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutPaymentStep').then(
            module => module.CheckoutPaymentStep,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
