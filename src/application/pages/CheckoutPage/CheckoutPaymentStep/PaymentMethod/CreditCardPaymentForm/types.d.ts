import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICheckoutCreditCardState } from '@interfaces/checkout';
import { IFormFieldMutate } from '@stores/reducers/pages/checkout/types';
import { IMenuItemSelect } from '@components/UI/SprykerSelect/types';

export interface ICreditCardPaymentFormProps extends WithStyles<typeof styles> {
    providersCollection: IMenuItemSelect[];
    paymentCreditCardData?: ICheckoutCreditCardState;
    mutateStateCreditCardAction?: (payload: IFormFieldMutate) => void;
    mutatePaymentSectionAction?: (payload: boolean) => void;
}
