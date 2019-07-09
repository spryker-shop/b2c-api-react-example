import { ICustomerProfileIdentity, } from '@interfaces/customer';
import { IAddressItem } from '@interfaces/addresses';
import { IConfigInputState, IFormStateIndexSignature } from '@interfaces/forms';

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

export interface ICheckoutCreditCardState extends IFormStateIndexSignature {
    paymentProvider: IConfigInputState;
    cardNumber: IConfigInputState;
    cardName: IConfigInputState;
    cardExpiryDate: IConfigInputState;
    cardCVC: IConfigInputState;
}

export interface ICheckoutInvoiceState extends IFormStateIndexSignature {
    dateOfBirth: IConfigInputState;
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

export interface IPaymentMethodsGrouped {
    [key: string]: IPaymentMethod[];
}

export interface IShipmentMethodsGrouped {
    [key: string]: IShipmentMethod[];
}

export interface IShipmentMethodLabelData {
    [key: string]: {
        name: JSX.Element | string;
        icon?: JSX.Element;
    };
}
