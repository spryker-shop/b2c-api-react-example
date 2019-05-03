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
import { LoadableOrderHistoryPage } from '@pages/OrderHistoryPage/loadable';
import { LoadableCustomerAddressPage } from '@pages/CustomerAddressesPage/loadable';
import { LoadableWishlistPage } from '@pages/WishlistPage/loadable';
import { LoadableOrderDetailsPage } from '@pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@pages/WishlistDetail/loadable';
import { CustomerAddressForm } from '@pages/CustomerAddressForm';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerPage } exact component={ LoadableCustomerProfilePage } />
        <Route path={ pathCustomerAddressesPage } exact component={ LoadableCustomerAddressPage }/>
        <Route path={ pathAddressFormUpdate } exact component={ CustomerAddressForm }/>
        <Route path={ pathAddressFormNew } exact component={ CustomerAddressForm }/>
        <Route path={ pathWishlistsPage } exact component={ LoadableWishlistPage }/>
        <Route path={ pathWishlistDetailPage } exact component={ LoadableWishlistDetail }/>
        <Route path={ pathOrderHistoryPage } exact component={ LoadableOrderHistoryPage }/>
        <Route path={ pathOrderDetailsPage } exact component={ LoadableOrderDetailsPage }/>
        <Route path={ pathCustomerProfilePage } exact component={ LoadableCustomerProfilePage }/>
    </Switch>
);
