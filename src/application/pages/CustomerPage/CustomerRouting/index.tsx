import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
    pathAddressFormNew,
    pathAddressFormUpdate,
    pathCustomerAddressesPage,
    pathCustomerPage,
    pathCustomerProfilePage,
    pathOrderDetailsPage,
    pathOrderHistoryPage,
    pathWishlistDetailPage,
    pathWishlistsPage,
} from '@constants/routes';
import { LoadableOrderHistoryPage } from '@application/pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressPage } from '@application/pages/CustomerAddressesPage/loadable';
import { LoadableWishlistPage } from '@application/pages/WishListPage/loadable';
import { LoadableOrderDetailsPage } from '@application/pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@application/pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@application/pages/WishlistDetail/loadable';
import { CustomerAddressForm } from '@application/pages/CustomerAddressForm';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerPage } exact component={ LoadableCustomerProfilePage } />
        <Route path={ pathCustomerAddressesPage } exact
               component={ LoadableCustomerAddressPage } />
        <Route path={ pathAddressFormUpdate } component={ CustomerAddressForm }/>
        <Route path={ pathAddressFormNew } component={ CustomerAddressForm } />
        <Route path={ pathWishlistsPage } component={ LoadableWishlistPage } />
        <Route path={ pathWishlistDetailPage } component={ LoadableWishlistDetail } />
        <Route path={ pathOrderHistoryPage } exact component={ LoadableOrderHistoryPage } />
        <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage } />
        <Route path={ pathCustomerProfilePage } component={ LoadableCustomerProfilePage } />
    </Switch>
);
