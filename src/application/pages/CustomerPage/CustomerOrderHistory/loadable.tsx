import * as React from 'react';

export const LoadablCustomerOrderHistory = React.lazy(() =>
    import('@pages/CustomerPage/CustomerOrderHistory').then(module => ({ default: module.CustomerOrderHistory }))
);
