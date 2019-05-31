import * as React from 'react';
import { Route, Switch } from 'react-router';
import {
    pathCheckoutLoginStep,
    pathCheckoutAddressStep,
    pathCheckoutShipmentStep,
    pathCheckoutPaymentStep,
    pathCheckoutSummaryStep,
    pathCheckoutThanks
} from '@constants/routes';
import { LoadableCheckoutLoginStep } from '@pages/CheckoutPage/CheckoutLoginStep/loadable';
import { LoadableCheckoutAddressStep } from '@pages/CheckoutPage/CheckoutAddressStep/loadable';
import { LoadableCheckoutShipmentStep } from '@pages/CheckoutPage/CheckoutShipmentStep/loadable';
import { LoadableCheckoutPaymentStep } from '@pages/CheckoutPage/CheckoutPaymentStep/loadable';
import { LoadableCheckoutSummaryStep } from '@pages/CheckoutPage/CheckoutSummaryStep/loadable';
import { LoadableCheckoutThanks } from '@pages/CheckoutPage/CheckoutThanks/loadable';
import { ICheckoutRoutingProps as Props } from './types';

export const CheckoutRouting: React.FC<Props> = (props): JSX.Element => {
    const { stepsCompletion, isSendBtnDisabled, sendData } = props;

    return (
        <Switch>
            <Route path={ pathCheckoutLoginStep } exact component={ LoadableCheckoutLoginStep } />
            <Route path={ pathCheckoutAddressStep } exact component={ LoadableCheckoutAddressStep } />
            <Route path={ pathCheckoutShipmentStep } exact component={ LoadableCheckoutShipmentStep } />
            <Route path={ pathCheckoutPaymentStep } exact component={ LoadableCheckoutPaymentStep } /> } />
            <Route
                path={ pathCheckoutSummaryStep }
                exact
                render={ () =>
                    <LoadableCheckoutSummaryStep
                        stepsCompletion={ stepsCompletion }
                        isSendBtnDisabled={ isSendBtnDisabled }
                        sendData={ sendData }
                    />
                }
            />
            <Route path={ pathCheckoutThanks } exact component={ LoadableCheckoutThanks } /> } />
        </Switch>
    );
};
