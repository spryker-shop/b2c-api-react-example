import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import {
    ICheckoutStepsCompletionState,
    IDeliverySelectionState,
    IBillingSelectionState,
    ICheckoutRequest,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState
} from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { WithRouter } from '@interfaces/common';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isUserLoggedIn: boolean;
    isCheckoutLoading: boolean;
    isCheckoutFulfilled: boolean;
    profile: ICustomerDataParsed;
    isProductsExists: boolean;
    cartId: string;
    customerReference: string;
    addressesCollection: IAddressItemCollection[];
    orderId: string;
    anonymId: string;
    getCheckoutDataAction: (payload: ICheckoutRequest, anonymId: string) => void;
    sendCheckoutDataAction: (payload: ICheckoutRequest, anonymId: string) => void;
    getCustomerProfileAction: (customerReference: string) => void;
    stepsCompletion: ICheckoutStepsCompletionState;
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: IAddressFormState;
    billingNewAddress: IAddressFormState;
    shipmentMethod: string;
    paymentMethod: string;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData:  ICheckoutInvoiceState;
    isCheckoutInitiated: boolean;
    isCartEmpty: boolean;
}

export interface ICheckoutPageState {
    isButtonDisabled: boolean;
    isDataSending: boolean;
}
