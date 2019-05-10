import {
    IBillingObjectConfigInputStable,
    IConfigInputStable,
    ICreditCardObjectConfigInputStable,
    IDeliveryObjectConfigInputStable,
    IInvoiceObjectConfigInputStable
} from '@constants/checkout/types';
import { IConfigInputState, IConfigInputStable } from '@interfaces/forms';

export interface IParamInputValidity {
    value: string | number | boolean;
    fieldConfig: IConfigInputStable;
}

export interface IParamFormValidity {
    form: { [key: string]: IConfigInputState };
    fieldsConfig: IDeliveryObjectConfigInputStable
        | IBillingObjectConfigInputStable
        | IInvoiceObjectConfigInputStable
        | ICreditCardObjectConfigInputStable;
}
