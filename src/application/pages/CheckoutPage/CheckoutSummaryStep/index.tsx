import * as React from 'react';
import { ICheckoutSummaryStepProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    pathCheckoutAddressStep,
    pathCheckoutPaymentStep,
    pathCheckoutShipmentStep,
    pathCheckoutThanks
} from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const CheckoutSummaryStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <div>
            <NavLink to={ pathCheckoutAddressStep }><FormattedMessage id={ 'word.address.title' } /></NavLink>
            <NavLink to={ pathCheckoutShipmentStep }><FormattedMessage id={ 'word.shipment.title' } /></NavLink>
            <NavLink to={ pathCheckoutPaymentStep }><FormattedMessage id={ 'word.payment.title' } /></NavLink>
            <NavLink to={ pathCheckoutThanks }>Thanks</NavLink>
        </div>
    );
};

export const CheckoutSummaryStep = withStyles(styles)(CheckoutSummaryStepComponent);
