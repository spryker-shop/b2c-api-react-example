import * as React from 'react';
import { pathOrderDetailsPage, pathOrderHistoryPage, pathWishlistsPage } from '@constants/routes';
import { FormattedMessage } from 'react-intl';

export const breadcrumbsListFixtures = [
    {
        path: `${pathOrderHistoryPage}/`,
        listData: [
            {
                name:  <FormattedMessage id={ 'word.order.history.title' } />,
                path: pathOrderHistoryPage,
                current: false
            },
            {
                name:  <FormattedMessage id={ 'order.details.title' } />,
                path: pathOrderDetailsPage,
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
