import * as React from 'react';

export const LoadableCustomerPage = React.lazy(() =>
    import('@pages/CustomerPage').then(module => ({ default: module.CustomerPage }))
);
