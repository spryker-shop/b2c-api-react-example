import { IPaymentMethod, IShipmentMethod, ICheckoutCreditCardState, ICheckoutInvoiceState } from '@interfaces/checkout';
import {
    IPaymentMethodGroupItem,
    TPaymentProvidersCollection,
    ICreditCardObjectConfigInputStable,
    IInvoiceObjectConfigInputStable
} from '@constants/checkout/types';
import { BlurEvent, FormEvent, InputChangeEvent } from '@interfaces/common';

// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
    submitHandler: (event: FormEvent) => void;
    inputChangeHandler: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
}

// Param to create shipping methods form
export interface IShippingMethodsParams extends IBaseCheckoutFormHandler {
    shipmentMethods: IShipmentMethod[] | null;
    currentValueShipmentMethod: IShipmentMethod['id'] | null;
    carrierName: IShipmentMethod['carrierName'];
    shipmentCarrierNameToIcon: {
        [key: string]: JSX.Element;
    };
}

export interface IPaymentProviderToIcon {
    [key: string]: JSX.Element;
}

// Param to create payment methods form
export interface IPaymentMethodsParams extends IBaseCheckoutFormHandler {
    paymentMethodGroupItems: IPaymentMethodGroupItem[] | null;
    currentValuePaymentMethod?: IPaymentMethod['paymentMethodName'] | null;
}

// Param to create invoice payment form
export interface IPaymentInvoiceParams extends IBaseCheckoutFormHandler {
    inputsData: ICheckoutInvoiceState;
    inputsConfig: IInvoiceObjectConfigInputStable;
}

// Param to create creditCard payment form
export interface IPaymentCreditCardParams extends IBaseCheckoutFormHandler {
    inputsData: ICheckoutCreditCardState;
    inputsConfig: ICreditCardObjectConfigInputStable;
    providersCollection: TPaymentProvidersCollection;
}
