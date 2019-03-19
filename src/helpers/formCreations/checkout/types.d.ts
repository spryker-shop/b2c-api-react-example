import {
    IPaymentMethod,
    ISameAsDelivery,
    IShipmentMethod,
    ICheckoutAddressState,
    ICheckoutCreditCardState,
    ICheckoutInvoiceState
} from '@interfaces/checkout';
import { IFormField } from '@application/components/UI/SprykerForm/types';
import { IAddressItemCollection } from '@interfaces/addresses';
import {
    IPaymentMethodGroupItem,
    TCurrentValueBillingSelection,
    TCurrentValueDeliverySelection,
    TExtraOptionsToSelection,
    TPaymentProvidersCollection,
    ICreditCardObjectConfigInputStable,
    IInvoiceObjectConfigInputStable,
    IObjectConfigInputStable
} from '@constants/checkout/types';
import { BlurEvent, FormEvent, InputChangeEvent } from '@interfaces/common';
import { ICountry } from '@interfaces/country';

// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
    submitHandler: (event: FormEvent) => void;
    inputChangeHandler: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
}

// Param to create address forms
export interface IAddressParams extends IBaseCheckoutFormHandler {
    inputsData: ICheckoutAddressState;
    inputsConfig: IObjectConfigInputStable;
    countriesCollection: ICountry[] | null;
    listFieldNameToChangeHandler?: {
        [key: string]: IFormField['onChangeOwnHandler']
    };
}

// Param to create SameAsDelivery form
export interface ISameAsDeliveryParams extends IBaseCheckoutFormHandler {
    isSameAsDelivery: ISameAsDelivery['isSameAsDelivery'];
}

// Param to create saved addresses form
export interface IAddressesParams extends IBaseCheckoutFormHandler {
    addressesCollection: IAddressItemCollection[] | null;
    extraOptionsToSelection: TExtraOptionsToSelection;
    currentValueInSelection: TCurrentValueDeliverySelection | TCurrentValueBillingSelection;
}

export interface IDeliveryAddressesParams extends IAddressesParams {}

export interface IBillingAddressesParams extends IAddressesParams {}

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
