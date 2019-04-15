import { RouteProps } from 'react-router';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TCartId } from '@interfaces/cart';
import { ICustomerDataParsed, TCustomerReference } from '@interfaces/customer';
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
    cartId: TCartId;
    customerReference: TCustomerReference | null;
    addressesCollection: IAddressItemCollection[] | null;
    orderId: string;
    anonymId: string;
    getCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    sendCheckoutData: (payload: ICheckoutRequest, anonymId: string) => void;
    getCustomerData: (customerReference: TCustomerReference) => void;
    stepsCompletion: ICheckoutStepsCompletionState;
    deliverySelection: IDeliverySelectionState;
    billingSelection: IBillingSelectionState;
    deliveryNewAddress: ICheckoutAddressState;
    billingNewAddress: IBillingAddressState;
    shipmentMethod: IShipmentMethod['id'] | null;
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData:  ICheckoutInvoiceState;
    clearCheckoutDataForm: () => void;
}

export interface ICheckoutPageState {
    isButtonDisabled: boolean;
}
