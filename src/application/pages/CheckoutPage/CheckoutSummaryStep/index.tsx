import * as React from 'react';
import { ICheckoutSummaryStepProps as Props } from './types';
import { Button, withStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    pathCheckoutAddressStep,
    pathCheckoutPaymentStep,
    pathCheckoutShipmentStep,
    pathCheckoutLoginStep
} from '@constants/routes';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const CheckoutSummaryStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        isSendBtnDisabled,
        sendData,
        stepsCompletion: { isAddressStepPassed, isBillingStepPassed, isShipmentStepPassed, isPaymentStepPassed }
    } = props;
    const isAllCheckoutFormsFulfilled = isAddressStepPassed && isBillingStepPassed && isShipmentStepPassed &&
        isPaymentStepPassed;

    if (!isAllCheckoutFormsFulfilled) {
        return <Redirect to={ pathCheckoutLoginStep } />;
    }

    return (
        <div>
            <NavLink to={ pathCheckoutAddressStep }><FormattedMessage id={ 'word.address.title' } /></NavLink>
            <NavLink to={ pathCheckoutShipmentStep }><FormattedMessage id={ 'word.shipment.title' } /></NavLink>
            <NavLink to={ pathCheckoutPaymentStep }><FormattedMessage id={ 'word.payment.title' } /></NavLink>

            <Button
                variant="contained"
                color="primary"
                disabled={ isSendBtnDisabled }
                fullWidth
                onClick={ sendData }
            >
                { <FormattedMessage id={ 'place.order.title' } /> }
            </Button>
        </div>
    );
};

export const CheckoutSummaryStep = withStyles(styles)(CheckoutSummaryStepComponent);
