import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import {
    ICheckoutStepsCompletionState,
    IDeliverySelectionState,
    IBillingSelectionState,
    ICheckoutRequest,
    IShipmentMethod,
    IPaymentMethod,
    ICheckoutAddressState,
    IBillingAddressState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState
} from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';
import { WithRouter } from '@interfaces/common';

export interface ICheckoutPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isUserLoggedIn: boolean;
    isCheckoutLoading: boolean;
    isCheckoutFulfilled: boolean;
    profile: ICustomerDataParsed | null;
    isProductsExists: boolean;
    cartId: string;
    customerReference: string | null;
    addressesCollection: IAddressItemCollection[] | null;
    orderId: string;
    anonymId: string;
    getCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    sendCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    getCustomerData: (customerReference: string) => void;
    stepsCompletion: ICheckoutStepsCompletionState;
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: ICheckoutAddressState;
    billingNewAddress: IBillingAddressState;
    shipmentMethod: IShipmentMethod['id'] | null;
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData:  ICheckoutInvoiceState;
    isCheckoutInitiated: boolean;
}

export interface ICheckoutPageState {
    isButtonDisabled: boolean;
    isDataSending: boolean;
}
