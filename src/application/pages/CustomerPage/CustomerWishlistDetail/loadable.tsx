import * as React from 'react';

export const LoadablCustomerWishlistDetail = React.lazy(() =>
    import('@pages/CustomerPage/CustomerWishlistDetail').then(module => ({ default: module.CustomerWishlistDetail }))
);
