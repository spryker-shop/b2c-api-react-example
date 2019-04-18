import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathCheckoutAddressStep } from '@constants/routes';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import { LoginForm } from '@containers/LoginForm';
import { ICheckoutLoginStep as Props } from './types';
import { LockIcon } from './icons';
import { styles } from './styles';

const CheckoutLoginStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, isUserLoggedIn, clearCheckoutDataForm } = props;

    if (isUserLoggedIn) {
        return <Redirect to={ pathCheckoutAddressStep } />;
    }

    return (
        <>
            <div className={ classes.box }>
                <Grid container className={ classes.grid }>
                    <Grid item xs={ 6 } className={ classes.col }>
                        <Typography component="h3" variant="h2" className={ classes.title }>
                            <FormattedMessage id={ 'new.customers.title' } />
                        </Typography>
                        <Typography color="textSecondary" variant="h6" className={ classes.subheading }>
                            <FormattedMessage id={ 'login.guest.customers.message' } />
                        </Typography>
                        <Button
                            component={
                                ({innerRef, ...props}) => <NavLink { ...props } to={ pathCheckoutAddressStep } />
                            }
                            variant="contained"
                            fullWidth
                            onClick={ clearCheckoutDataForm }
                        >
                            <FormattedMessage id={ 'continue.as.guest.title' } />
                        </Button>
                    </Grid>
                    <Grid item xs={ 6 } className={ classes.col }>
                        <Typography component="h3" variant="h2" className={ classes.title }>
                            <FormattedMessage id={ 'returning.customers.title' } />
                        </Typography>
                        <Typography color="textSecondary" variant="h6" className={ classes.subheading }>
                            <FormattedMessage id={ 'login.customers.message' } />
                        </Typography>
                        <LoginForm
                            redirectAfterLoginPath={ pathCheckoutAddressStep }
                            onSubmitHandler={ clearCheckoutDataForm }
                        />
                    </Grid>
                </Grid>
            </div>
            <span className={ classes.secure }>
                <span className={ classes.secureIcon }>
                    <LockIcon />
                </span>
                <span className={ classes.secureText }>
                    <FormattedMessage id={ 'secure.checkout.title' } />
                </span>
            </span>
        </>
    );

};

export const CheckoutLoginStep = connect(withStyles(styles)(CheckoutLoginStepComponent));
