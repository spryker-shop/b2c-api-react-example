import * as React from 'react';

export const LoadablCustomerWishlists = React.lazy(() =>
    import('@pages/CustomerPage/CustomerWishlists').then(module => ({ default: module.CustomerWishlists }))
);
