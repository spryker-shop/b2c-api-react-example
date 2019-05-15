import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { AppMain } from '@components/AppMain';
import { CheckoutCart } from '@pages/CheckoutPage/CheckoutCart';
import { AppPageTitle } from '@components/AppPageTitle';
import { getAddressForm } from '@helpers/forms';
import { ClickEvent } from '@interfaces/common';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICheckoutRequest } from '@interfaces/checkout';
import { ICheckoutPageProps as Props, ICheckoutPageState as State } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
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
        isButtonDisabled: true,
        isDataSending: false
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
            isCheckoutInitiated,
            orderId,
            history
        } = this.props;
        const { isDataSending } = this.state;

        if (!prevProps.isCheckoutFulfilled && isCheckoutFulfilled) {
            if (!profile && isUserLoggedIn && customerReference) {
                getCustomerData(customerReference);
            }
        }

        if (isCheckoutLoading && !prevProps.isCheckoutLoading) {
            this.setState({ isDataSending: false });
        }

        if (prevProps.isCheckoutInitiated && !isCheckoutInitiated && !isDataSending) {
            this.getCheckoutData();
        }

        if (isCheckoutLoading !== prevProps.isCheckoutLoading) {
            this.setState({ isButtonDisabled: isCheckoutLoading });
        }

        if (!prevProps.orderId && orderId) {
            history.push(pathCheckoutThanks);
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
        this.setState({ isButtonDisabled: true, isDataSending: true });
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
            shipmentMethod
        } = this.props;

        const payload: ICheckoutRequest = {};

        if (deliverySelection.isAddNew) {
            payload.shippingAddress = getAddressForm(deliveryNewAddress);
        } else {
            const shippingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.shippingAddress = { ...shippingAddress, country: shippingAddress.country.name };
        }

        if (billingSelection.isAddNew || !billingSelection.isSameAsDelivery && !isUserLoggedIn) {
            payload.billingAddress = getAddressForm(billingNewAddress);
        } else if (billingSelection.isSameAsDelivery) {
            payload.billingAddress = payload.shippingAddress;
        } else {
            const billingAddress = addressesCollection.find((address: IAddressItemCollection) =>
                address.id === deliverySelection.selectedAddressId);
            payload.billingAddress = { ...billingAddress, country: billingAddress.country.name };
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
        const isThanksPage = pathname === pathCheckoutThanks;
        const isLoginPage = pathname === pathCheckoutLoginStep;

        if (pathCheckoutPage === pathname) {
            return <Redirect to={ redirectPath } />;
        }

        if (!isProductsExists && !isThanksPage && !isLoginPage) {
            return (
                <AppMain classes={{ wrapper: classes.wrapper }}>
                    <AppPageTitle title={ <FormattedMessage id={ 'no.products.in.checkout.title' } /> } />
                </AppMain>
            );
        }

        return (
            <>
                { !isThanksPage &&
                    <CheckoutBreadcrumbs />
                }
                <AppMain classes={{ wrapper: classes.wrapper }}>
                    { (!isCheckoutLoading || isSummaryPage) &&
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
                                <div
                                    className={`
                                        ${classes.summaryColumn} ${isSummaryPage ? classes.summaryColumnSummary : ''}
                                    `}
                                >
                                    <CheckoutCart
                                        isSendBtnDisabled={ isButtonDisabled }
                                        sendData={ this.handleSubmit }
                                        isSummaryPage={ isSummaryPage }
                                    />
                                </div>
                            }
                        </div>
                    }
                </AppMain>
            </>
        );
    }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageComponent);
