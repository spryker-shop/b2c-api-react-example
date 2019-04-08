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

export const CheckoutRouting: React.SFC<Props> = (props): JSX.Element => {
    const { stepsCompletion, isSendBtnDisabled, sendData } = props;

    return (
        <Switch>
            <Route path={ pathCheckoutLoginStep } exact render={ props => <LoadableCheckoutLoginStep {...props} /> } />
            <Route
                path={ pathCheckoutAddressStep }
                exact
                render={ props => <LoadableCheckoutAddressStep {...props} stepsCompletion={ stepsCompletion } /> }
            />
            <Route
                path={ pathCheckoutShipmentStep }
                exact
                render={ props => <LoadableCheckoutShipmentStep {...props} stepsCompletion={ stepsCompletion } /> } /> }
            />
            <Route
                path={ pathCheckoutPaymentStep }
                exact
                render={ props => <LoadableCheckoutPaymentStep {...props} stepsCompletion={ stepsCompletion } /> } /> }
            />
            <Route
                path={ pathCheckoutSummaryStep }
                exact
                render={ props =>
                    <LoadableCheckoutSummaryStep
                        {...props}
                        stepsCompletion={ stepsCompletion }
                        isSendBtnDisabled={ isSendBtnDisabled }
                        sendData={ sendData }
                    />
                }
            />
            <Route path={ pathCheckoutThanks } exact render={ props => <LoadableCheckoutThanks {...props} /> } />
        </Switch>
    );
};
