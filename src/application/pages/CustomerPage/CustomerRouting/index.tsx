import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
    pathAddressFormNew,
    pathAddressFormUpdate,
    pathCustomerAddressesPage,
    pathCustomerProfilePage,
    pathOrderDetailsPage,
    pathOrderHistoryPage,
    pathWishlistDetailPage,
    pathWishlistsPage,
    pathCustomerOverviewPage
} from '@constants/routes';
import { LoadablOrderHistoryPage } from '@pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressesPage } from '@pages/CustomerAddressesPage/loadable';
import { LoadablWishlistPage } from '@pages/WishlistPage/loadable';
import { LoadableOrderDetailsPage } from '@pages/OrderDetailsPage/loadable';
import { LoadablCustomerProfilePage } from '@pages/CustomerProfilePage/loadable';
import { LoadablWishlistDetailPage } from '@pages/WishlistDetailPage/loadable';
import { LoadablCustomerOverviewPage } from '@pages/CustomerOverviewPage/loadable';
import { LoadableCustomerAddressPage } from '@pages/CustomerAddressPage/loadable';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerOverviewPage } exact component={ LoadablCustomerOverviewPage } />
        <Route path={ pathCustomerAddressesPage } exact component={ LoadableCustomerAddressesPage }/>
        <Route path={ pathAddressFormUpdate } exact component={ LoadableCustomerAddressPage }/>
        <Route path={ pathAddressFormNew } exact component={ LoadableCustomerAddressPage }/>
        <Route path={ pathWishlistsPage } exact component={ LoadablWishlistPage }/>
        <Route path={ pathWishlistDetailPage } exact component={ LoadablWishlistDetailPage }/>
        <Route path={ pathOrderHistoryPage } exact component={ LoadablOrderHistoryPage }/>
        <Route path={ pathOrderDetailsPage } exact component={ LoadableOrderDetailsPage }/>
        <Route path={ pathCustomerProfilePage } exact component={ LoadablCustomerProfilePage }/>
    </Switch>
);
