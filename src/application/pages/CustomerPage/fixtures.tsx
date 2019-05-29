import * as React from 'react';
import { pathCustomerOrderDetails, pathCustomerOrderHistory, pathWishlistsPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';

export const breadcrumbsListFixtures = [
    {
        path: `${pathCustomerOrderHistory}/`,
        listData: [
            {
                name:  <FormattedMessage id={ 'word.order.history.title' } />,
                path: pathCustomerOrderHistory,
                current: false
            },
            {
                name:  <FormattedMessage id={ 'order.details.title' } />,
                path: pathCustomerOrderDetails,
                current: true
            }
        ]
    },
    {
        path: `${pathWishlistsPage}/`,
        listData: [
            {
                name:  <FormattedMessage id={ 'word.wishlist.title' } />,
                path: pathWishlistsPage,
                current: false
            }
        ]
    }
];
