import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ICheckoutCreditCardState, ICheckoutInvoiceState } from '@interfaces/checkout';

export interface ICheckoutSummaryPaymentProps extends WithStyles<typeof styles> {
    paymentMethod: string;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
}
