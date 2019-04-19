import { styles } from './styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IPaymentMethod } from '@interfaces/checkout';
import { ICheckoutCreditCardState, ICheckoutInvoiceState } from './types';
import { IFormUpdatePaymentStatus } from '@stores/reducers/pages/checkout/types';

export interface IPaymentMethodProps extends WithStyles<typeof styles> {
    paymentMethod: IPaymentMethod['paymentMethodName'] | null;
    paymentMethods: IPaymentMethod[] | null;
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    mutatePaymentMethod: (IFormUpdatePaymentStatus) => void;
}
