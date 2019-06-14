import { styles } from './styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IPaymentMethod, ICheckoutCreditCardState, ICheckoutInvoiceState } from '@interfaces/checkout';
import { IFormUpdatePaymentStatus } from '@stores/reducers/pages/checkout/types';

export interface IPaymentMethodProps extends WithStyles<typeof styles> {
    paymentMethod: string;
    paymentMethods: IPaymentMethod[];
    paymentCreditCardData: ICheckoutCreditCardState;
    paymentInvoiceData: ICheckoutInvoiceState;
    mutatePaymentMethodAction: (IFormUpdatePaymentStatus) => void;
}
