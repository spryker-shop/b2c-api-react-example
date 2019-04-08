import * as React from 'react';
import { ShipmentMethod } from './ShipmentMethod';
import { ICheckoutShipmentStepProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathCheckoutAddressStep, pathCheckoutPaymentStep } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const CheckoutShipmentStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { checkoutShipmentStep } } = props;

    return (
        <div>
            <ShipmentMethod />
            <NavLink to={ pathCheckoutAddressStep }><FormattedMessage id={ 'word.back.title' } /></NavLink>
            { checkoutShipmentStep &&
                <NavLink to={ pathCheckoutPaymentStep }><FormattedMessage id={ 'word.payment.title' } /></NavLink>
            }
        </div>
    );
};

export const CheckoutShipmentStep = withStyles(styles)(CheckoutShipmentStepComponent);
