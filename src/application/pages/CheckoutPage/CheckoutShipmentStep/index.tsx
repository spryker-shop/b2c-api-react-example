import * as React from 'react';
import { connect } from './connect';
import { ShipmentMethods } from './ShipmentMethods';
import { ICheckoutShipmentStepProps as Props } from './types';
import { Button, Typography, withStyles } from '@material-ui/core';
import { pathCheckoutAddressStep, pathCheckoutPaymentStep } from '@constants/routes';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PrevIcon } from './icons';
import { styles } from './styles';

const CheckoutShipmentStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { isShipmentStepPassed, isBillingStepPassed, isAddressStepPassed } } = props;
    const isAddressFulfilled = isBillingStepPassed && isAddressStepPassed;

    if (!isAddressFulfilled) {
        return <Redirect to={ pathCheckoutAddressStep } />;
    }

    return (
        <>
            <div className={ classes.box }>
                <Typography component="h2" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ 'word.shipment.title' } />
                </Typography>
                <ShipmentMethods />
            </div>
            <div className={ classes.actions }>
                <Button
                    disabled={ !isShipmentStepPassed }
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutPaymentStep } /> }
                    variant="contained"
                    className={ classes.button }
                >
                    <FormattedMessage id={ 'go.to.shipment.title' } />
                </Button>

                <NavLink to={ pathCheckoutAddressStep } className={ classes.back }>
                    <span className={ classes.icon } >
                        <PrevIcon />
                    </span>
                    <FormattedMessage id={ 'word.back.title' } />
                </NavLink>
            </div>
        </>
    );
};

export const CheckoutShipmentStep = connect(withStyles(styles)(CheckoutShipmentStepComponent));
