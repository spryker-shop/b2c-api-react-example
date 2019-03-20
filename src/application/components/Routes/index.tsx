import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@application/hoc/ProtectedRoute';
import { AppMain } from '@application/components/AppMain';
import { LoadableHomePage } from '@application/pages/HomePage/loadable';
import { LoadableSearchPage } from '@application/pages/SearchPage/loadable';
import { LoadableProductPage } from '@application/pages/ProductPage/loadable';
import { LoadableLoginPage } from '@application/pages/LoginPage/loadable';
import { LoadableRegisterPage } from '@application/pages/RegisterPage/loadable';
import { LoadableCartPage } from '@application/pages/CartPage/loadable';
import { LoadableCustomerPage } from '@application/pages/CustomerPage/loadable';
import { LoadablePasswordForgotPage } from '@application/pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '@application/pages/ResetPasswordPage/loadable';
import { LoadableWishlistPage } from '@application/pages/WishlistPage/loadable';
import { LoadableWishlistDetail } from '@application/pages/WishlistDetail/loadable';
import { LoadableCheckoutPage } from '@application/pages/CheckoutPage/loadable';
import { LoadableOrderDetailsPage } from '@application/pages/OrderDetailsPage/loadable';
import { CustomerAddressForm } from '@application/pages/CustomerAddressForm';
import { LoadableNotFound } from '@application/pages/NotFound/loadable';
import {
    pathAddressFormUpdate,
    pathCartPage,
    pathCategoryPage,
    pathCheckoutPage,
    pathCustomerPage,
    pathForgotPassword,
    pathHomePage,
    pathLoginPage,
    pathNotFoundPage,
    pathOrderDetailsPage,
    pathProductPage,
    pathResetPassword,
    pathSearchPage,
    pathWishlistDetailPage,
    pathWishlistsPage,
    pathRegisterPage
} from '@constants/routes';

export const getContentRoutes = (isReadyToShow: boolean): JSX.Element => {
    if (!isReadyToShow) {
        return <AppMain />;
    }

    return (
        <Switch>
            <Route path={ pathHomePage } exact render={ props => <LoadableHomePage {...props} /> }/>
            <Route path={ pathCategoryPage } exact render={ props => <LoadableSearchPage {...props} /> }/>
            <Route path={ pathSearchPage } exact render={ props => <LoadableSearchPage {...props} /> }/>
            <Route path={ pathProductPage } exact render={ props => <LoadableProductPage {...props} /> }/>
            <Route path={ pathLoginPage } exact render={ props => <LoadableLoginPage {...props} /> }/>
            <Route path={ pathRegisterPage } exact render={ props => <LoadableRegisterPage {...props} /> }/>
            <Route path={ pathCartPage } exact render={ props => <LoadableCartPage {...props} /> }/>
            <ProtectedRoute path={ pathCustomerPage } render={ props => <LoadableCustomerPage {...props} /> }/>
            <Route path={ pathHomePage } exact render={ props => <LoadablePasswordForgotPage {...props} /> }/>
            <Route
                path={ `${pathResetPassword}/:restoreKey` }
                exact
                render={ props => <LoadablePasswordResetPage {...props} /> }
            />

            <ProtectedRoute
                path={ pathWishlistsPage }
                exact
                render={ props => <LoadableWishlistPage {...props} /> }
            />
            <ProtectedRoute
                path={ pathWishlistDetailPage }
                exact
                render={ props => <LoadableWishlistDetail {...props} /> }
            />

            { /* TODO: Change to ProtectedRoute */ }
            <Route path={ pathCheckoutPage } exact render={ props => <LoadableCheckoutPage {...props} /> }/>
            <Route path={ pathOrderDetailsPage } exact render={ props => <LoadableOrderDetailsPage {...props} /> }/>
            <Route path={ pathAddressFormUpdate } exact render={ props => <CustomerAddressForm {...props} /> }/>

            <Route path={ pathNotFoundPage } exact render={ props => <LoadableNotFound {...props} /> }/>
        </Switch>
    );
};
