import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutSummaryStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutSummaryStep').then(
            module => module.CheckoutSummaryStep,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
