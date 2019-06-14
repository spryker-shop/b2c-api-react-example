import * as React from 'react';
import { INavLinkData } from '@interfaces/navigations';
import {
    pathCustomerAddresses,
    pathCustomerProfile,
    pathCustomerOrderHistory,
    pathWishlistsPage
} from '@constants/routes';
import { UserIcon, AddressesIcon, ListIcon, HistoryIcon } from './icons';

export const navLinks: INavLinkData[] = [
    { path: pathCustomerProfile, title: 'word.profile.title', icon: <UserIcon /> },
    { path: pathCustomerAddresses, title: 'word.addresses.title', icon: <AddressesIcon /> },
    { path: pathCustomerOrderHistory, title: 'word.order.history.title', icon: <HistoryIcon /> },
    { path: pathWishlistsPage, title: 'word.wishlist.title', icon: <ListIcon />}
];
