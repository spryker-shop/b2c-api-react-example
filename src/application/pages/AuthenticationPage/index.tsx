import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage, pathRegisterPage, pathAuthenticationPage, pathHomePage } from '@constants/routes';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { MainContainer } from '@components/MainContainer';
import { AuthenticationRouting } from './AuthenticationRouting';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { IAuthenticationPageProps as Props, IAuthenticationPageState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
@connect
class AuthenticationPageComponent extends React.Component<Props> {
    public readonly state: State = {
        shouldRedirect: false
    };

    public componentDidMount = (): void => this.props.isUserLoggedIn && this.setState({ shouldRedirect: true });

    public render(): JSX.Element {
        const { shouldRedirect } = this.state;
        const { classes, location } = this.props;
        const isBasePath = location.pathname === pathAuthenticationPage;
        const isRegisterPage = location.pathname === pathRegisterPage;
        const isLoginPage = location.pathname === pathLoginPage;

        if (shouldRedirect) {
            return <Redirect to={ pathHomePage } />;
        }

        if (isBasePath) {
            return <Redirect to={ pathLoginPage } />;
        }

        return (
            <MainContainer classes={{ layout: classes.layout, wrapper: classes.wrapper }}>
                <Grid container justify="center">
                    <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 6 } className={ classes.box }>
                        <ul className={ classes.heading }>
                            <li className={`${classes.headingItem} ${isLoginPage ? classes.headingItemActive : ''}`}>
                                <NavLink to={ pathLoginPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.login.title' } />
                                </NavLink>
                            </li>
                            <li className={`${classes.headingItem} ${isRegisterPage ? classes.headingItemActive : ''}`}>
                                <NavLink to={ pathRegisterPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.register.title' } />
                                </NavLink>
                            </li>
                        </ul>
                        <div className={ classes.inner }>
                            <ErrorBoundary>
                                <AuthenticationRouting />
                            </ErrorBoundary>
                        </div>
                    </Grid>
                </Grid>
            </MainContainer>
        );
    }
}

export const AuthenticationPage = withStyles(styles)(AuthenticationPageComponent);
