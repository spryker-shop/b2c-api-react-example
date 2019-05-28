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
import { LoadableCheckoutPage } from '@pages/CheckoutPage/loadable';
import { LoadableNotFound } from '@pages/NotFoundPage/loadable';
import {
    pathCartPage,
    pathCategoryPage,
    pathCheckoutPage,
    pathCustomerPage,
    pathForgotPassword,
    pathHomePage,
    pathLoginPage,
    pathNotFoundPage,
    pathProductPage,
    pathResetPassword,
    pathSearchPage,
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
            <Route path={ pathHomePage } exact component={  LoadableHomePage }/>
            <Route path={ pathCategoryPage } exact component={  LoadableSearchPage }/>
            <Route path={ pathSearchPage } exact component={  LoadableSearchPage }/>
            <Route path={ pathProductPage } exact component={  LoadableProductPage }/>
            <Route path={ pathLoginPage } exact component={  LoadableLoginPage }/>
            <Route path={ pathRegisterPage } exact component={  LoadableRegisterPage }/>
            <Route path={ pathCartPage } exact component={  LoadableCartPage }/>
            <ProtectedRoute path={ pathCustomerPage } component={  LoadableCustomerPage }/>
            <Route path={ pathForgotPassword } exact component={  LoadablePasswordForgotPage }/>
            <Route path={ `${pathResetPassword}/:restoreKey` } exact component={  LoadablePasswordResetPage } />
            <Route path={ pathCheckoutPage } component={  LoadableCheckoutPage }/>
            <Route path={ pathNotFoundPage } exact component={  LoadableNotFound }/>
        </Switch>
    );
};
