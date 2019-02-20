import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { pathCustomerPage, pathForgotPassword } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import { LoginForm } from './LoginForm';
import { RegisterFormComponent } from './RegisterFormComponent';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import {
    ILoginPageProps as Props,
} from './types';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class LoginPageBase extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        if (!prevProps.isAuth && this.props.isAuth) {
            this.props.getCustomerCart();
            this.props.history.push(pathCustomerPage);
        }
    }

    public render(): JSX.Element {
        const {classes, handleSubmitLoginForm, handleSubmitRegisterForm} = this.props;

        return (
            <AppMain>
                <Grid item xs={12} sm={12} md={6}
                      direction="column"
                      container
                      justify="center"
                      alignItems="center"
                >
                    <ErrorBoundary>
                        <LoginForm handleSubmit={handleSubmitLoginForm} />
                    </ErrorBoundary>
                    <div className={classes.link}>
                        <NavLink to={pathForgotPassword}>
                            <FormattedMessage id={'forgot.password.title'} />
                        </NavLink>
                    </div>
                </Grid>
                <div className={classes.divider} id="divider" />
                <Grid item xs={12} sm={12} md={6}
                      direction="column"
                      container
                      justify="center"
                      alignItems="center"
                >
                    <ErrorBoundary>
                        <RegisterFormComponent handleSubmit={handleSubmitRegisterForm} />
                    </ErrorBoundary>
                </Grid>
            </AppMain>
        );
    }
}

export const LoginPageComponent = withStyles(styles)(LoginPageBase);
