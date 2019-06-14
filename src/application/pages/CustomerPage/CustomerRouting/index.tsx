import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    pathAddressFormNew,
    pathAddressFormUpdate,
    pathCustomerAddresses,
    pathCustomerProfile,
    pathCustomerOrderDetails,
    pathCustomerOrderHistory,
    pathCustomerWishlistDetail,
    pathWishlistsPage,
    pathCustomerOverview
} from '@constants/routes';
import { LoadablCustomerOrderHistory } from '@pages/CustomerPage/CustomerOrderHistory/loadable';
import { LoadableCustomerAddresses } from '@pages/CustomerPage/CustomerAddresses/loadable';
import { LoadablCustomerWishlists } from '@pages/CustomerPage/CustomerWishlists/loadable';
import { LoadableCustomerOrderDetails } from '@pages/CustomerPage/CustomerOrderDetails/loadable';
import { LoadablCustomerProfile } from '@pages/CustomerPage/CustomerProfile/loadable';
import { LoadablCustomerWishlistDetail } from '@pages/CustomerPage/CustomerWishlistDetail/loadable';
import { LoadablCustomerOverview } from '@pages/CustomerPage/CustomerOverview/loadable';
import { LoadableCustomerAddress } from '@pages/CustomerPage/CustomerAddress/loadable';
import { Preloader } from '@components/Preloader';

export const CustomerRouting: React.FC = (): JSX.Element => (
    <React.Suspense fallback={ <Preloader /> }>
        <Switch>
            <Route path={ pathCustomerOverview } exact component={ LoadablCustomerOverview } />
            <Route path={ pathCustomerAddresses } exact component={ LoadableCustomerAddresses }/>
            <Route path={[pathAddressFormUpdate, pathAddressFormNew]} exact component={ LoadableCustomerAddress }/>
            <Route path={ pathWishlistsPage } exact component={ LoadablCustomerWishlists }/>
            <Route path={ pathCustomerWishlistDetail } exact component={ LoadablCustomerWishlistDetail }/>
            <Route path={ pathCustomerOrderHistory } exact component={ LoadablCustomerOrderHistory }/>
            <Route path={ pathCustomerOrderDetails } exact component={ LoadableCustomerOrderDetails }/>
            <Route path={ pathCustomerProfile } exact component={ LoadablCustomerProfile }/>
        </Switch>
    </React.Suspense>
);
