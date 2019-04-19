import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@hoc/ProtectedRoute';
import { AppMain } from '@components/AppMain';
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

export const Routes: React.SFC<Props> = (props): JSX.Element => {
    const { isAppLoading } = props;

    if (!isAppLoading) {
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
            <Route path={ pathForgotPassword } exact render={ props => <LoadablePasswordForgotPage {...props} /> }/>
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

            <Route path={ pathCheckoutPage } render={ props => <LoadableCheckoutPage {...props} /> }/>
            <Route path={ pathOrderDetailsPage } exact render={ props => <LoadableOrderDetailsPage {...props} /> }/>
            <Route path={ pathAddressFormUpdate } exact render={ props => <CustomerAddressForm {...props} /> }/>

            <Route path={ pathNotFoundPage } exact render={ props => <LoadableNotFound {...props} /> }/>
        </Switch>
    );
};
