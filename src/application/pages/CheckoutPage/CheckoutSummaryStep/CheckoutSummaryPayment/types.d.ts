import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IPaymentMethod, ICheckoutCreditCardState, ICheckoutInvoiceState } from '@interfaces/checkout';

export interface ICheckoutSummaryPaymentProps extends WithStyles<typeof styles> {
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
}
