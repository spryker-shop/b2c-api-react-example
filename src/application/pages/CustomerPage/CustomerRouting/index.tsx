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
import { LoadableWishlistPage } from '@application/pages/WishlistPage/loadable';
import { LoadableOrderDetailsPage } from '@application/pages/OrderDetailsPage/loadable';
import { LoadableCustomerProfilePage } from '@application/pages/CustomerProfilePage/loadable';
import { LoadableWishlistDetail } from '@application/pages/WishlistDetail/loadable';
import { CustomerAddressForm } from '@application/pages/CustomerAddressForm';

export const CustomerRouting: React.SFC = (): JSX.Element => (
    <Switch>
        <Route path={ pathCustomerPage } exact render={ props => <LoadableCustomerProfilePage {...props} /> }/>
        <Route path={ pathCustomerAddressesPage } exact render={ props => <LoadableCustomerAddressPage {...props} /> }/>
        <Route path={ pathAddressFormUpdate } exact render={ props => <CustomerAddressForm {...props} /> }/>
        <Route path={ pathAddressFormNew } exact render={ props => <CustomerAddressForm {...props} /> }/>
        <Route path={ pathWishlistsPage } exact render={ props => <LoadableWishlistPage {...props} /> }/>
        <Route path={ pathWishlistDetailPage } exact render={ props => <LoadableWishlistDetail {...props} /> }/>
        <Route path={ pathOrderHistoryPage } exact render={ props => <LoadableOrderHistoryPage {...props} /> }/>
        <Route path={ pathOrderDetailsPage } exact render={ props => <LoadableOrderDetailsPage {...props} /> }/>
        <Route path={ pathCustomerProfilePage } exact render={ props => <LoadableCustomerProfilePage {...props} /> }/>
    </Switch>
);
