import {
    IBillingObjectConfigInputStable,
    IConfigInputStable,
    ICreditCardObjectConfigInputStable,
    IDeliveryObjectConfigInputStable,
    IInvoiceObjectConfigInputStable
} from '@constants/checkout/types';
import { TFormInputValue } from '@components/UI/SprykerForm/types';
import {
    ICheckoutCreditCardState,
    ICheckoutInvoiceState,
    ICheckoutAddressState
} from '@interfaces/checkout';

export interface IParamInputValidity {
    value: TFormInputValue;
    fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
    form: ICheckoutAddressState | ICheckoutInvoiceState | ICheckoutCreditCardState;
    fieldsConfig: IDeliveryObjectConfigInputStable
        | IBillingObjectConfigInputStable
        | IInvoiceObjectConfigInputStable
        | ICreditCardObjectConfigInputStable;
}
