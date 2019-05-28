import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage, pathRegisterPage, pathCustomerOverviewPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { AppMain } from '@components/AppMain';
import { LoginForm } from '@containers/LoginForm';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { ILoginPageProps as Props } from './types';
import { styles } from './styles';

class LoginPageComponent extends React.Component<Props> {
    public render(): JSX.Element {
        const { classes } = this.props;

        return (
            <AppMain classes={{ layout: classes.layout, wrapper: classes.wrapper }}>
                <Grid container justify="center">
                    <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 6 } className={ classes.box }>
                        <ul className={ classes.heading }>
                            <li className={ `${classes.headingItem} ${classes.headingItemActive}` }>
                                <NavLink to={ pathLoginPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.login.title' } />
                                </NavLink>
                            </li>
                            <li className={ classes.headingItem }>
                                <NavLink to={ pathRegisterPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.register.title' } />
                                </NavLink>
                            </li>
                        </ul>
                        <div className={ classes.inner }>
                            <ErrorBoundary>
                                <LoginForm redirectAfterLoginPath={ pathCustomerOverviewPage } />
                            </ErrorBoundary>
                        </div>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const LoginPage = withStyles(styles)(LoginPageComponent);
