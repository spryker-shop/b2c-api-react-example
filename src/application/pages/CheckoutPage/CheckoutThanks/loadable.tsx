import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutThanks = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutThanks').then(
            module => module.CheckoutThanks,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
