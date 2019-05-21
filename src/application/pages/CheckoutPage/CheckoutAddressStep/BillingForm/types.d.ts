import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingSelectionState, IFormFieldMutate } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export interface IBillingFormProps extends WithStyles<typeof styles> {
    isUserLoggedIn?: boolean;
    addressesCollection?: IAddressItemCollection[] | null;
    isCheckoutFulfilled?: boolean;
    billingNewAddress?: IAddressFormState;
    billingSelection?: IBillingSelectionState;
    mutateStateBillingSelectionSameAsDelivery?: (payload: boolean) => void;
    mutateStateBillingSelectionAddressId?: (payload: string) => void;
    mutateStateBillingSelectionAddNew?: () => void;
    mutateBillingStep?: (payload: boolean) => void;
    mutateStateNewAddressBilling?: (payload: IFormFieldMutate) => void;
}
