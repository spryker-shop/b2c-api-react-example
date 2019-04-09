import * as React from 'react';
import { PaymentMethod } from './PaymentMethod';
import { ICheckoutPaymentStepProps as Props } from './types';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import { pathCheckoutShipmentStep, pathCheckoutSummaryStep } from '@constants/routes';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const CheckoutPaymentStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { isPaymentStepPassed, isShipmentStepPassed } } = props;

    if (!isShipmentStepPassed) {
        return <Redirect to={ pathCheckoutShipmentStep } />;
    }

    return (
        <div>
            <PaymentMethod />
            <NavLink to={ pathCheckoutShipmentStep }><FormattedMessage id={ 'word.back.title' } /></NavLink>
            { isPaymentStepPassed &&
                <NavLink to={ pathCheckoutSummaryStep }><FormattedMessage id={ 'word.summary.title' } /></NavLink>
            }
        </div>
    );
};

export const CheckoutPaymentStep = withStyles(styles)(CheckoutPaymentStepComponent);
