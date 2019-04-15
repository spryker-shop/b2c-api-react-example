import { IRadioItem } from '@application/components/UI/SprykerForm/types';
import { IMenuItemSelect } from './types';
import { IPaymentMethod, IShipmentMethod } from '@interfaces/checkout';
import { IAddressItemCollection } from '@interfaces/addresses';

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

export interface ICheckoutPaymentMethodsNames {
    invoice: string;
    creditCard: string;
}

export interface IPaymentMethodsGrouped {
    [key: string]: IPaymentMethod[];
}

export type TPaymentProvidersCollection = IMenuItemSelect[];

export interface IPaymentMethodGroupItem extends IRadioItem {}

export interface IShipmentMethodsGrouped {
    [key: string]: IShipmentMethod[];
}

export interface ICheckoutSelectionInputs {
    isAddNewDeliveryValue: string;
    isAddNewBillingValue: string;
    isSameAsDeliveryValue: string;
}

export type TAddressType = 'delivery' | 'billing';

export type TExtraOptionsToSelection = IRadioItem[] | null;

export type TCurrentValueDeliverySelection = ICheckoutSelectionInputs['isAddNewDeliveryValue']
    | IAddressItemCollection['id']
    | null;

export type TCurrentValueBillingSelection = ICheckoutSelectionInputs['isAddNewBillingValue']
    | ICheckoutSelectionInputs['isSameAsDeliveryValue']
    | IAddressItemCollection['id']
    | null;

export interface IConfigInputStable {
    isRequired: boolean;
    inputName: string;
}

export interface IAddressConfigInputStable {
    firstName: IConfigInputStable;
    lastName: IConfigInputStable;
    salutation: IConfigInputStable;
    address1: IConfigInputStable;
    address2: IConfigInputStable;
    address3: IConfigInputStable;
    zipCode: IConfigInputStable;
    city: IConfigInputStable;
    country: IConfigInputStable;
    company: IConfigInputStable;
    phone: IConfigInputStable;

    [key: string]: IConfigInputStable;
}

export interface ICreditCardObjectConfigInputStable {
    paymentProvider: IConfigInputStable;
    cardNumber: IConfigInputStable;
    cardName: IConfigInputStable;
    cardExpiryMonth: IConfigInputStable;
    cardExpiryYear: IConfigInputStable;
    cardCVC: IConfigInputStable;

    [key: string]: IConfigInputStable;
}

export interface IInvoiceObjectConfigInputStable {
    dateOfBirth: IConfigInputStable;

    [key: string]: IConfigInputStable;
}
