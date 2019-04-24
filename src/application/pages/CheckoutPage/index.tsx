import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import { CheckoutCart } from '@application/pages/CheckoutPage/CheckoutCart';
import { AppPageTitle } from '@application/components/AppPageTitle';
import { getAddressForm } from '@helpers/checkout';
import { ClickEvent } from '@interfaces/common';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICheckoutRequest } from '@interfaces/checkout';
import { ICheckoutPageProps as Props, ICheckoutPageState as State } from './types';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { CheckoutRouting } from './CheckoutRouting';
import { Redirect, withRouter } from 'react-router-dom';
import {
    pathCheckoutAddressStep,
    pathCheckoutLoginStep,
    pathCheckoutPage,
    pathCheckoutSummaryStep,
    pathCheckoutThanks
} from '@constants/routes';
import { CheckoutBreadcrumbs } from './CheckoutBreadcrumbs';
import { styles } from './styles';

@(withRouter as Function)
@connect
class CheckoutPageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isButtonDisabled: true
    };

    public componentDidMount = (): void => {
        const { isCheckoutFulfilled } = this.props;

        if (!isCheckoutFulfilled) {
            this.getCheckoutData();
        }
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const {
            isCheckoutLoading,
            profile,
            isUserLoggedIn,
            isCheckoutFulfilled,
            customerReference,
            getCustomerData,
            isCheckoutInitiated
        } = this.props;

        if (!prevProps.isCheckoutFulfilled && isCheckoutFulfilled) {
            if (!profile && isUserLoggedIn && customerReference) {
                getCustomerData(customerReference);
            }
        }

        if (prevProps.isCheckoutInitiated && !isCheckoutInitiated) {
            this.getCheckoutData();
        }

        if (isCheckoutLoading !== prevProps.isCheckoutLoading) {
            this.setState({ isButtonDisabled: isCheckoutLoading });
        }
    };

    protected getCheckoutData = (): void => {
        const { isUserLoggedIn, anonymId, getCheckoutData, cartId } = this.props;

        if (isUserLoggedIn) {
            getCheckoutData({ idCart: cartId }, '');

            return;
        }

        getCheckoutData({ idCart: cartId }, anonymId);
    };

    protected handleSubmit = (event: ClickEvent): void => {
        this.setState({ isButtonDisabled: true });
        event.preventDefault();
        const {
            addressesCollection,
            isUserLoggedIn,
            cartId,
            sendCheckoutData,
            profile,
            anonymId,
            deliverySelection,
            billingSelection,
            deliveryNewAddress,
            billingNewAddress,
            paymentMethod,
            shipmentMethod,
            history
        } = this.props;

        const payload: ICheckoutRequest = {};

        if (deliverySelection.isAddNew) {
            payload.shippingAddress = getAddressForm(deliveryNewAddress);
        } else {
            const shippingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.shippingAddress = { ...shippingAddress, country: '' };
        }

        if (billingSelection.isAddNew) {
            payload.billingAddress = getAddressForm(billingNewAddress);
        } else if (billingSelection.isSameAsDelivery) {
            payload.billingAddress = payload.shippingAddress;
        } else {
            const billingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.billingAddress = { ...billingAddress, country: '' };
        }

        payload.idCart = cartId;

        payload.payments = [ {
            paymentProviderName: 'DummyPayment',
            paymentMethodName: paymentMethod
        } ];

        payload.shipment = { idShipmentMethod: parseInt(shipmentMethod, 10) };
        const customerEmail = isUserLoggedIn ? profile.email : payload.shippingAddress.email;
        const customerSalutation = isUserLoggedIn ? profile.salutation : payload.shippingAddress.salutation;
        const customerFirstName = isUserLoggedIn ? profile.firstName : payload.shippingAddress.firstName;
        const customerLastName = isUserLoggedIn ? profile.lastName : payload.shippingAddress.lastName;
        const customerIdInspection = isUserLoggedIn ? '' : anonymId;

        payload.customer = {
            email: customerEmail,
            salutation: customerSalutation,
            firstName: customerFirstName,
            lastName: customerLastName
        };

        sendCheckoutData(payload, customerIdInspection);
        history.push(pathCheckoutThanks);
    };

    protected shouldHideOrderInfo = (): boolean => {
        const forbiddenPaths = [pathCheckoutLoginStep, pathCheckoutThanks];
        const currentLocation = this.props.location.pathname;

        return forbiddenPaths.some(path => currentLocation.includes(path));
    };

    public render(): JSX.Element {
        const {
            classes,
            isProductsExists,
            isUserLoggedIn,
            stepsCompletion,
            isCheckoutLoading,
            location: { pathname }
        } = this.props;
        const { isButtonDisabled } = this.state;
        const redirectPath = isUserLoggedIn ? pathCheckoutAddressStep : pathCheckoutLoginStep;
        const isSummaryPage = pathname === pathCheckoutSummaryStep;

        if (pathCheckoutPage === pathname) {
            return <Redirect to={ redirectPath } />;
        }

        if (!isProductsExists) {
            return (
                <AppMain classes={{ wrapper: classes.wrapper }}>
                    <AppPageTitle title={ <FormattedMessage id={ 'no.products.in.checkout.title' } /> } />
                </AppMain>
            );
        }

        return (
            <>
                <CheckoutBreadcrumbs />
                { !isCheckoutLoading &&
                    <AppMain classes={{ wrapper: classes.wrapper }}>
                        <div className={ classes.container }>
                            <div
                                className={`
                                    ${classes.contentColumn} ${this.shouldHideOrderInfo() ? classes.fullWidth : ''}
                                `}
                            >
                                <ErrorBoundary>
                                    <CheckoutRouting
                                        stepsCompletion={ stepsCompletion }
                                        isSendBtnDisabled={ isButtonDisabled }
                                        sendData={ this.handleSubmit }
                                    />
                                </ErrorBoundary>
                            </div>
                            {!this.shouldHideOrderInfo() &&
                                <div className={ classes.summaryColumn }>
                                    <CheckoutCart
                                        isSendBtnDisabled={ isButtonDisabled }
                                        sendData={ this.handleSubmit }
                                        isSummaryPage={ isSummaryPage }
                                    />
                                </div>
                            }
                        </div>
                    </AppMain>
                }
            </>
        );
    }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageComponent);
