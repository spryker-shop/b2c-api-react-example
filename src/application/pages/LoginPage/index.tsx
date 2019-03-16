import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { pathCustomerPage, pathForgotPassword, pathLoginPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import { LoginForm } from './LoginForm';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { ILoginPageProps as Props } from './types';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class LoginPageComponent extends React.Component<Props> {
    public componentDidUpdate = (prevProps: Props): void => {
        if (!prevProps.isAuth && this.props.isAuth) {
            this.props.getCustomerCart();
            this.props.history.push(pathCustomerPage);
        }
    };

    public render(): JSX.Element {
        const { classes, handleSubmitLoginForm } = this.props;

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
                                <NavLink to={ pathLoginPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.register.title' } />
                                </NavLink>
                            </li>
                        </ul>
                        <div className={ classes.inner }>
                            <ErrorBoundary>
                                <LoginForm
                                    handleSubmit={ handleSubmitLoginForm }
                                    classes={ { wrapper: classes.formWrapper } }
                                />
                            </ErrorBoundary>
                            <Typography align="center" component="div" variant="headline" color="textSecondary">
                                <NavLink to={ pathForgotPassword } className={ classes.link }>
                                    <FormattedMessage id={ 'forgot.password.title' } />
                                </NavLink>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const LoginPage = withStyles(styles)(LoginPageComponent);
