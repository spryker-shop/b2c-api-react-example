import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { TPaymentProvidersCollection } from '@constants/checkout/types';
import { ICheckoutCreditCardState } from '@interfaces/checkout';
import { IFormFieldMutate } from '@stores/reducers/pages/checkout/types';

export interface ICreditCardPaymentFormProps extends WithStyles<typeof styles> {
    providersCollection: TPaymentProvidersCollection;
    paymentCreditCardData?: ICheckoutCreditCardState;
    mutateStateCreditCardAction?: (payload: IFormFieldMutate) => void;
    mutatePaymentSectionAction?: (payload: boolean) => void;
}
