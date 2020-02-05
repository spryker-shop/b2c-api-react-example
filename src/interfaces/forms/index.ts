import { IIndexSignature } from '@interfaces/common';

export interface IConfigInputState {
    value: string | number | boolean;
    isError?: boolean;
}

export interface IConfigInputStable {
    inputName: string;
    isRequired?: boolean;
    isEmail?: boolean;
    minLength?: number;
}

export interface IFormConfigInputStable {
    [key: string]: IConfigInputStable;
}

export interface IFormStateIndexSignature {
    [key: string]: IConfigInputState;
}

export interface IFormInputIndexSignature {
    [key: string]: boolean | number | string;
}

export interface IAddressFormState extends IFormStateIndexSignature {
    firstName: IConfigInputState;
    lastName: IConfigInputState;
    salutation: IConfigInputState;
    address1: IConfigInputState;
    address2: IConfigInputState;
    address3: IConfigInputState;
    zipCode: IConfigInputState;
    city: IConfigInputState;
    country: IConfigInputState;
    company: IConfigInputState;
    phone: IConfigInputState;
}

export interface IParamInputValidity {
    value: string | number | boolean;
    fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
    form: IFormStateIndexSignature;
    fieldsConfig: IFormConfigInputStable;
}

export interface ICheckoutFormsNames {
    billing: string;
    delivery: string;
    invoice: string;
    creditCard: string;
    savedDelivery: string;
    sameAsDeliveryForm: string;
    savedBilling: string;
    shipmentMethodBase: string;
    paymentMethod: string;
}

export interface ICheckoutPaymentMethodsNames extends IIndexSignature {
    invoice?: string;
    creditCard?: string;
    dummyPaymentInvoice?: string;
    dummyPaymentCreditCard?: string;
}

export interface ICheckoutSelectionInputs {
    isAddNewDeliveryValue: string;
    isAddNewBillingValue: string;
    isSameAsDeliveryValue: string;
}
