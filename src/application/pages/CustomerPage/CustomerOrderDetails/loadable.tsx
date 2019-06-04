import * as React from 'react';

export const LoadableCustomerOrderDetails = React.lazy(() =>
    import('@pages/CustomerPage/CustomerOrderDetails').then(module => ({ default: module.CustomerOrderDetails }))
);
