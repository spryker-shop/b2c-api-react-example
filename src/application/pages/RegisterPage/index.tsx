import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { MainContainer } from '@components/MainContainer';
import { RegisterForm } from './RegisterForm';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { ILoginPageProps as Props } from './types';
import { styles } from './styles';

class RegisterPageComponent extends React.Component<Props> {
    public render(): JSX.Element {
        const { classes } = this.props;

        return (
            <MainContainer classes={{ layout: classes.layout, wrapper: classes.wrapper }}>
                <Grid container justify="center">
                    <Grid item xs={ 12 } sm={ 12 } md={ 9 } lg={ 6 } className={ classes.box }>
                        <ul className={ classes.heading }>
                            <li className={ classes.headingItem }>
                                <NavLink to={ pathLoginPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.login.title' } />
                                </NavLink>
                            </li>
                            <li className={ `${classes.headingItem} ${classes.headingItemActive}` }>
                                <NavLink to={ pathLoginPage } className={ classes.redirectLink }>
                                    <FormattedMessage id={ 'word.register.title' } />
                                </NavLink>
                            </li>
                        </ul>
                        <div className={ classes.inner }>
                            <ErrorBoundary>
                                <RegisterForm />
                            </ErrorBoundary>
                        </div>
                    </Grid>
                </Grid>
            </MainContainer>
        );
    }
}

export const RegisterPage = withStyles(styles)(RegisterPageComponent);
