import * as React from 'react';
import Loadable from 'react-loadable';
import { FormattedMessage } from 'react-intl';

export const LoadableCheckoutShipmentStep = Loadable({
    loader: () =>
        import('@pages/CheckoutPage/CheckoutShipmentStep').then(
            module => module.CheckoutShipmentStep,
        ),
    loading: () => <div><FormattedMessage id={ 'word.loading.title' } /></div>,
});
