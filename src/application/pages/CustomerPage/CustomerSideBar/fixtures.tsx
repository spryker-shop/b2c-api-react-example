import * as React from 'react';
import { INavLinkData } from '@interfaces/navigations';
import {
    pathCustomerAddressesPage,
    pathCustomerProfilePage,
    pathOrderHistoryPage,
    pathWishlistsPage,
    pathCustomerOverviewPage
} from '@constants/routes';
import { UserIcon, AddressesIcon, HeartIcon, HistoryIcon, OverviewIcon } from './icons';

export const navLinks: INavLinkData[] = [
    { path: pathCustomerOverviewPage, title: 'word.profile.overview', icon: <OverviewIcon /> },
    { path: pathCustomerProfilePage, title: 'word.profile.title', icon: <UserIcon /> },
    { path: pathCustomerAddressesPage, title: 'word.addresses.title', icon: <AddressesIcon /> },
    { path: pathOrderHistoryPage, title: 'word.order.history.title', icon: <HistoryIcon /> },
    { path: pathWishlistsPage, title: 'word.wishlist.title', icon: <HeartIcon />}
];
