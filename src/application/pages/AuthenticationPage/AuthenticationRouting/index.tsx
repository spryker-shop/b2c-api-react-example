import * as React from 'react';
import { Route, Switch } from 'react-router';
import { pathLoginPage, pathCustomerOverview, pathRegisterPage } from '@constants/routes';
import { AuthenticationRegister } from '@pages/AuthenticationPage/AuthenticationRegister';
import { LoginForm } from '@containers/LoginForm';

export const AuthenticationRouting: React.FC = (): JSX.Element => (
    <Switch>
        <Route path={ pathRegisterPage } exact component={ AuthenticationRegister }/>
        <Route
            path={ pathLoginPage }
            exact
            render={ () => <LoginForm redirectAfterLoginPath={ pathCustomerOverview } /> }
        />
    </Switch>
);
