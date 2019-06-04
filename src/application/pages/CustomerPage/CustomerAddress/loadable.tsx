import * as React from 'react';

export const LoadableCustomerAddress = React.lazy(() =>
    import('@pages/CustomerPage/CustomerAddress').then(module => ({ default: module.CustomerAddress }))
);
