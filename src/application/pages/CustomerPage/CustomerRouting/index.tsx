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
