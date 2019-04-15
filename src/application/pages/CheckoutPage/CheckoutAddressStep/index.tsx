import * as React from 'react';
import { DeliveryForm } from './DeliveryForm';
import { BillingForm } from './BillingForm';
import { ICheckoutAddressStepProps as Props } from './types';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathCheckoutShipmentStep, pathCheckoutLoginStep } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PrevIcon } from './icons';

const CheckoutAddressStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { isAddressStepPassed, isBillingStepPassed } } = props;
    const isFormFulfilled = isBillingStepPassed && isAddressStepPassed;

    return (
        <>
            <div className={ classes.box }>
                <Typography component="h2" variant="display3" className={ classes.title }>
                    <FormattedMessage id={ 'shipping.address.title' } />
                </Typography>
                <DeliveryForm />
            </div>
            <div className={ classes.box }>
                <Typography component="h2" variant="display3" className={ classes.title }>
                    <FormattedMessage id={ 'billing.address.title' } />
                </Typography>
                <BillingForm />
            </div>
            <div className={ classes.actions }>
                <Button
                    disabled={ !isFormFulfilled }
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutShipmentStep } /> }
                    variant="contained"
                    className={ classes.button }
                >
                    <FormattedMessage id={ 'go.to.shipment.title' } />
                </Button>

                <NavLink to={ pathCheckoutLoginStep } className={ classes.back }>
                    <span className={ classes.icon } >
                        <PrevIcon />
                    </span>
                    <FormattedMessage id={ 'word.back.title' } />
                </NavLink>
            </div>
        </>
    );
};

export const CheckoutAddressStep = withStyles(styles)(CheckoutAddressStepComponent);
