import { ICustomerProfileIdentity, } from '@interfaces/customer';
import { IAddressItem, IAddressItemCollection } from '@interfaces/addresses';
import { IConfigInputState } from '@interfaces/forms';

export interface IPaymentMethod {
    paymentProviderName: string;
    paymentMethodName: string;
    requiredRequestData?: string[];
}

export interface IShipmentMethod {
    carrierName: string;
    id: string;
    name: string;
    price: number;
    taxRate: number;
    shipmentDeliveryTime: string;
    [key: string]: string | number;
}

export interface ICheckoutRequest {
    customer?: ICustomerProfileIdentity;
    idCart?: string;
    billingAddress?: IAddressItem;
    shippingAddress?: IAddressItem;
    payments?: IPaymentMethod[];
    shipment?: {
        idShipmentMethod: number,
    };
}

export interface IPaymentProvider {
    paymentProviderName: string;
    paymentMethods: IPaymentMethod[];
}

export interface IcheckoutResponse {
    addresses: IAddressItemCollection[] | {};
    paymentProviders: IPaymentProvider[];
    shipmentMethods: IShipmentMethod[];
}

export interface IDeliverySelectionState {
    selectedAddressId: string;
    isAddNew: boolean;
}

export interface IBillingSelectionState {
    selectedAddressId: string;
    isAddNew: boolean;
    isSameAsDelivery: boolean;
}

export interface ICheckoutStepsCompletionState {
    isAddressStepPassed: boolean;
    isBillingStepPassed: boolean;
    isShipmentStepPassed: boolean;
    isPaymentStepPassed: boolean;
}

export interface ICheckoutCreditCardState {
    paymentProvider: IConfigInputState;
    cardNumber: IConfigInputState;
    cardName: IConfigInputState;
    cardExpiryDate: IConfigInputState;
    cardCVC: IConfigInputState;

    [key: string]: IConfigInputState;
}

export interface ICheckoutInvoiceState {
    dateOfBirth: IConfigInputState;

    [key: string]: IConfigInputState;
}

export interface IFormFieldMutate {
    key: string;
    value: string | boolean;
    isError: boolean;
}

export interface IFormUpdatePaymentStatus {
    value: string;
    isPaymentStepCompleted: boolean;
}
