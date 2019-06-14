import * as React from 'react';

export const LoadablCustomerProfile = React.lazy(() =>
    import('@pages/CustomerPage/CustomerProfile').then(module => ({ default: module.CustomerProfile }))
);
