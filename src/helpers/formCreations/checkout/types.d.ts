import { IShipmentMethod, ICheckoutInvoiceState } from '@interfaces/checkout';
import { IInvoiceObjectConfigInputStable } from '@constants/checkout/types';
import { BlurEvent, FormEvent, InputChangeEvent } from '@interfaces/common';

// Base handlers for checkout's page forms
export interface IBaseCheckoutFormHandler {
    submitHandler: (event: FormEvent) => void;
    inputChangeHandler: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
}

export interface IPaymentProviderToIcon {
    [key: string]: JSX.Element;
}

// Param to create invoice payment form
export interface IPaymentInvoiceParams extends IBaseCheckoutFormHandler {
    inputsData: ICheckoutInvoiceState;
    inputsConfig: IInvoiceObjectConfigInputStable;
}
