import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from '@hoc/ProtectedRoute';
import { LoadableHomePage } from '@pages/HomePage/loadable';
import { LoadableSearchPage } from '@pages/SearchPage/loadable';
import { LoadableProductPage } from '@pages/ProductPage/loadable';
import { LoadableCartPage } from '@pages/CartPage/loadable';
import { LoadableCustomerPage } from '@pages/CustomerPage/loadable';
import { LoadablePasswordForgotPage } from '@pages/ForgotPasswordPage/loadable';
import { LoadablePasswordResetPage } from '@pages/ResetPasswordPage/loadable';
import { LoadableCheckoutPage } from '@pages/CheckoutPage/loadable';
import { LoadableNotFoundPage } from '@pages/NotFoundPage/loadable';
import { LoadableAuthenticationPage } from '@pages/AuthenticationPage/loadable';
import {
    pathCartPage,
    pathCategoryPage,
    pathCheckoutPage,
    pathCustomerPage,
    pathForgotPassword,
    pathHomePage,
    pathNotFoundPage,
    pathProductPage,
    pathResetPassword,
    pathSearchPage,
    pathAuthenticationPage
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
            <Route path={ pathHomePage } exact component={ LoadableHomePage }/>
            <Route path={ pathCategoryPage } exact component={ LoadableSearchPage }/>
            <Route path={ pathSearchPage } exact component={ LoadableSearchPage }/>
            <Route path={ pathProductPage } exact component={ LoadableProductPage }/>
            <Route path={ pathCartPage } exact component={ LoadableCartPage }/>
            <ProtectedRoute path={ pathCustomerPage } component={ LoadableCustomerPage }/>
            <Route path={ pathForgotPassword } exact component={ LoadablePasswordForgotPage }/>
            <Route path={ pathResetPassword } exact component={ LoadablePasswordResetPage } />
            <Route path={ pathCheckoutPage } component={ LoadableCheckoutPage }/>
            <Route path={ pathAuthenticationPage } component={ LoadableAuthenticationPage }/>
            <Route path={ pathNotFoundPage } exact component={ LoadableNotFoundPage }/>
        </Switch>
    );
};
