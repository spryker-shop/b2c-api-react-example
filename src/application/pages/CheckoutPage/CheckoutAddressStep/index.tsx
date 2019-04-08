import * as React from 'react';
import { DeliveryForm } from './DeliveryForm';
import { BillingFormComponent } from './BillingForm';
import { ICheckoutAddressStepProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathCheckoutShipmentStep, pathCheckoutLoginStep } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const CheckoutAddressStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { checkoutAddressStep, checkoutBillingStep } } = props;
    const isFormFulfilled = checkoutBillingStep && checkoutAddressStep;

    return (
        <div>
            <DeliveryForm />
            <BillingFormComponent />
            <NavLink to={ pathCheckoutLoginStep }><FormattedMessage id={ 'word.back.title' } /></NavLink>
            { isFormFulfilled &&
                <NavLink to={ pathCheckoutShipmentStep }><FormattedMessage id={ 'word.shipment.title' } /></NavLink>
            }
        </div>
    );
};

export const CheckoutAddressStep = withStyles(styles)(CheckoutAddressStepComponent);
