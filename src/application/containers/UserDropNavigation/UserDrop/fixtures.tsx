import * as React from 'react';
import { INavLinkData } from '@interfaces/navigations';
import {
    pathCustomerAddressesPage,
    pathCustomerProfilePage,
    pathOrderHistoryPage,
    pathWishlistsPage
} from '@constants/routes';
import { UserIcon, AddressesIcon, ListIcon, HistoryIcon } from './icons';

export const navLinks: INavLinkData[] = [
    { path: pathCustomerProfilePage, title: 'word.profile.title', icon: <UserIcon /> },
    { path: pathCustomerAddressesPage, title: 'word.addresses.title', icon: <AddressesIcon /> },
    { path: pathOrderHistoryPage, title: 'word.order.history.title', icon: <HistoryIcon /> },
    { path: pathWishlistsPage, title: 'word.wishlist.title', icon: <ListIcon />}
];
