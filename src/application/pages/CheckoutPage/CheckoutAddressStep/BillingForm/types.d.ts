import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingSelectionState, IFormFieldMutate } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export interface IBillingFormProps extends WithStyles<typeof styles> {
    isUserLoggedIn?: boolean;
    addressesCollection?: IAddressItemCollection[];
    isCheckoutFulfilled?: boolean;
    billingNewAddress?: IAddressFormState;
    billingSelection?: IBillingSelectionState;
    mutateStateBillingSelectionSameAsDeliveryAction?: (payload: boolean) => void;
    mutateStateBillingSelectionAddressIdAction?: (payload: string) => void;
    mutateStateBillingSelectionAddNewAction?: () => void;
    mutateBillingStepAction?: (payload: boolean) => void;
    mutateStateNewAddressBillingAction?: (payload: IFormFieldMutate) => void;
}
