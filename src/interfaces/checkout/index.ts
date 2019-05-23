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
    taxRate: number | null;
    shipmentDeliveryTime: string | null;
    [key: string]: string | number | null;
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

export interface IDeliverySelectionState {
    selectedAddressId: string | null;
    isAddNew: boolean;
}

export interface IBillingSelectionState {
    selectedAddressId: string | null;
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
