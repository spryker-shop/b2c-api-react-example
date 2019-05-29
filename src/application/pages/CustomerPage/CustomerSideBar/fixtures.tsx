import * as React from 'react';
import { INavLinkData } from '@interfaces/navigations';
import {
    pathCustomerAddresses,
    pathCustomerProfile,
    pathCustomerOrderHistory,
    pathWishlistsPage,
    pathCustomerOverview
} from '@constants/routes';
import { UserIcon, AddressesIcon, HeartIcon, HistoryIcon, OverviewIcon } from './icons';

export const navLinks: INavLinkData[] = [
    { path: pathCustomerOverview, title: 'word.profile.overview', icon: <OverviewIcon /> },
    { path: pathCustomerProfile, title: 'word.profile.title', icon: <UserIcon /> },
    { path: pathCustomerAddresses, title: 'word.addresses.title', icon: <AddressesIcon /> },
    { path: pathCustomerOrderHistory, title: 'word.order.history.title', icon: <HistoryIcon /> },
    { path: pathWishlistsPage, title: 'word.wishlist.title', icon: <HeartIcon />, isWishlist: true}
];
