import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@hoc/ProtectedRoute';
import { LoadableHomePage } from '@pages/HomePage/loadable';
import { LoadableSearchPage } from '@pages/SearchPage/loadable';
import { LoadableProductPage } from '@pages/ProductPage/loadable';
import { LoadableLoginPage } from '@pages/LoginPage/loadable';
import { LoadableRegisterPage } from '@pages/RegisterPage/loadable';
import { LoadableCartPage } from '@pages/CartPage/loadable';
import { LoadableCustomerPage } from '@pages/CustomerPage/loadable';
import { LoadablePasswordForgotPage } from '@pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '@pages/ResetPasswordPage/loadable';
import { LoadableWishlistPage } from '@pages/WishlistPage/loadable';
import { LoadableWishlistDetail } from '@pages/WishlistDetail/loadable';
import { LoadableCheckoutPage } from '@pages/CheckoutPage/loadable';
import { LoadableOrderDetailsPage } from '@pages/OrderDetailsPage/loadable';
import { CustomerAddressForm } from '@pages/CustomerAddressForm';
import { LoadableNotFound } from '@pages/NotFound/loadable';
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
    pathRegisterPage,
} from '@constants/routes';
import { RoutesProps as Props } from './types';
import { Preloader } from '@components/Preloader';

export const Routes: React.SFC<Props> = (props): JSX.Element => {
    const { isAppLoading } = props;

    if (!isAppLoading) {
        return <Preloader />;
    }

    return (
        <Switch>
            <Route path={ pathHomePage } exact render={ () => <LoadableHomePage /> }/>
            <Route path={ pathCategoryPage } exact render={ () => <LoadableSearchPage /> }/>
            <Route path={ pathSearchPage } exact render={ () => <LoadableSearchPage /> }/>
            <Route path={ pathProductPage } exact render={ () => <LoadableProductPage /> }/>
            <Route path={ pathLoginPage } exact render={ () => <LoadableLoginPage /> }/>
            <Route path={ pathRegisterPage } exact render={ () => <LoadableRegisterPage /> }/>
            <Route path={ pathCartPage } exact render={ () => <LoadableCartPage /> }/>
            <ProtectedRoute path={ pathCustomerPage } render={ () => <LoadableCustomerPage /> }/>
            <Route path={ pathForgotPassword } exact render={ () => <LoadablePasswordForgotPage /> }/>
            <Route path={ `${pathResetPassword}/:restoreKey` } exact render={ () => <LoadablePasswordResetPage /> } />
            <ProtectedRoute path={ pathWishlistsPage } exact render={ () => <LoadableWishlistPage /> } />
            <ProtectedRoute path={ pathWishlistDetailPage } exact render={ () => <LoadableWishlistDetail /> } />
            <Route path={ pathCheckoutPage } render={ () => <LoadableCheckoutPage /> }/>
            <Route path={ pathOrderDetailsPage } exact render={ () => <LoadableOrderDetailsPage /> }/>
            <Route path={ pathAddressFormUpdate } exact render={ () => <CustomerAddressForm /> }/>
            <Route path={ pathNotFoundPage } exact render={ () => <LoadableNotFound /> }/>
        </Switch>
    );
};
