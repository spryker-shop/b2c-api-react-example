import * as React from 'react';

export const LoadableCustomerAddresses = React.lazy(() =>
    import('@pages/CustomerPage/CustomerAddresses').then(module => ({ default: module.CustomerAddresses }))
);
