import { ICheckoutInvoiceState, IFormFieldMutate } from '@interfaces/checkout';

export interface IInvoicePaymentFormProps {
    paymentInvoiceData?: ICheckoutInvoiceState;
    mutatePaymentSectionAction?: (payload: boolean) => void;
    mutateStateInvoiceFormAction?: (payload: IFormFieldMutate) => void;
}
