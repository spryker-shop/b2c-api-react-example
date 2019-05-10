import { ICheckoutInvoiceState, IFormFieldMutate } from '@interfaces/checkout';

export interface IInvoicePaymentFormProps {
    paymentInvoiceData?: ICheckoutInvoiceState;
    mutatePaymentSection?: (payload: boolean) => void;
    mutateStateInvoiceForm?: (payload: IFormFieldMutate) => void;
}
