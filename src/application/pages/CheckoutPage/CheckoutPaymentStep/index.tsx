import * as React from 'react';
import { connect } from './connect';
import { PaymentMethod } from './PaymentMethod';
import { ICheckoutPaymentStepProps as Props } from './types';
import { Button, Typography, withStyles } from '@material-ui/core';
import { pathCheckoutShipmentStep, pathCheckoutSummaryStep } from '@constants/routes';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PrevIcon } from './icons';
import { styles } from './styles';

const CheckoutPaymentStepComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, stepsCompletion: { isPaymentStepPassed, isShipmentStepPassed } } = props;

    if (!isShipmentStepPassed) {
        return <Redirect to={ pathCheckoutShipmentStep } />;
    }

    return (
        <>
            <div className={ classes.box }>
                <Typography component="h2" variant="display3" className={ classes.title }>
                    <FormattedMessage id={ 'word.payment.title' } />
                </Typography>
                <PaymentMethod />
            </div>
            <div className={ classes.actions }>
                <Button
                    disabled={ !isPaymentStepPassed }
                    component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCheckoutSummaryStep } /> }
                    variant="contained"
                    className={ classes.button }
                >
                    <FormattedMessage id={ 'go.to.summary.title' } />
                </Button>

                <NavLink to={ pathCheckoutShipmentStep } className={ classes.back }>
                    <span className={ classes.icon } >
                        <PrevIcon />
                    </span>
                    <FormattedMessage id={ 'word.back.title' } />
                </NavLink>
            </div>
        </>
    );
};

export const CheckoutPaymentStep = connect(withStyles(styles)(CheckoutPaymentStepComponent));
