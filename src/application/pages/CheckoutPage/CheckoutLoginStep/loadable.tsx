import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutLoginStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutLoginStep').then(
            module => module.CheckoutLoginStep,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
