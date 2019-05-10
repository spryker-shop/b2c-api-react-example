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
import { OrderHistoryPage } from '@pages/OrderHistoryPage';
import { CustomerAddressesPage } from '@pages/CustomerAddressesPage';
import { LoadableWishlistPage } from '@pages/WishlistPage/loadable';
import { LoadableOrderDetailsPage } from '@pages/OrderDetailsPage/loadable';
import { CustomerProfilePage } from '@pages/CustomerProfilePage';
import { LoadableWishlistDetail } from '@pages/WishlistDetail/loadable';
import { LoadableCustomerOverviewPage } from '@pages/CustomerOverviewPage/loadable';
import { CustomerAddressForm } from '@pages/CustomerAddressForm';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerOverviewPage } exact component={ LoadableCustomerOverviewPage } />
        <Route path={ pathCustomerAddressesPage } exact component={ CustomerAddressesPage }/>
        <Route path={ pathAddressFormUpdate } exact component={ CustomerAddressForm }/>
        <Route path={ pathAddressFormNew } exact component={ CustomerAddressForm }/>
        <Route path={ pathWishlistsPage } exact component={ LoadableWishlistPage }/>
        <Route path={ pathWishlistDetailPage } exact component={ LoadableWishlistDetail }/>
        <Route path={ pathOrderHistoryPage } exact component={ OrderHistoryPage }/>
        <Route path={ pathOrderDetailsPage } exact component={ LoadableOrderDetailsPage }/>
        <Route path={ pathCustomerProfilePage } exact component={ CustomerProfilePage }/>
    </Switch>
);
