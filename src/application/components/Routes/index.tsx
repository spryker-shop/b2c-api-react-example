import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@application/hoc/ProtectedRoute';
import { AppMain } from '@application/components/AppMain';
import { LoadableHomePage } from '@application/pages/HomePage/loadable';
import { LoadableSearchPage } from '@application/pages/SearchPage/loadable';
import { LoadableProductPage } from '@application/pages/ProductPage/loadable';
import { LoadableLoginPage } from '@application/pages/LoginPage/loadable';
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
    pathWishlistsPage
} from '@constants/routes';

export const getContentRoutes = (isReadyToShow: boolean): JSX.Element => {
    if (!isReadyToShow) {
        return <AppMain />;
    }

    return (
        <Switch>
            <Route path={ pathHomePage } exact component={ LoadableHomePage }/>
            <Route path={ pathSearchPage } component={ LoadableSearchPage }/>
            <Route path={ pathCategoryPage } component={ LoadableSearchPage }/>
            <Route path={ pathProductPage } component={ LoadableProductPage }/>
            <Route path={ pathLoginPage } component={ LoadableLoginPage }/>
            <Route path={ pathCartPage } component={ LoadableCartPage }/>
            <ProtectedRoute path={ pathCustomerPage } component={ LoadableCustomerPage }/>
            <Route path={ pathForgotPassword } exact component={ LoadablePasswordForgotPage }/>
            <Route path={ `${pathResetPassword}/:restoreKey` } component={ LoadablePasswordResetPage }/>

            <ProtectedRoute path={ pathWishlistsPage } component={ LoadableWishlistPage }/>
            <ProtectedRoute path={ pathWishlistDetailPage } component={ LoadableWishlistDetail }/>

            { /* TODO: Change to ProtectedRoute */ }
            <Route path={ pathCheckoutPage } component={ LoadableCheckoutPage }/>
            <Route path={ pathOrderDetailsPage } component={ LoadableOrderDetailsPage }/>
            <Route path={ pathAddressFormUpdate } component={ CustomerAddressForm }/>

            <Route path={ pathNotFoundPage } component={ LoadableNotFound }/>
        </Switch>
    );
};
