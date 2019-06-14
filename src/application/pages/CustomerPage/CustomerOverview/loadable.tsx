import * as React from 'react';

export const LoadablCustomerOverview = React.lazy(() =>
    import('@pages/CustomerPage/CustomerOverview').then(module => ({ default: module.CustomerOverview }))
);
