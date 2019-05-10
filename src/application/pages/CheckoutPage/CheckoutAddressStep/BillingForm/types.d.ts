import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IBillingAddressState, IBillingSelectionState, IFormFieldMutate } from '@interfaces/checkout';

export interface IBillingFormProps extends WithStyles<typeof styles> {
    isUserLoggedIn?: boolean;
    addressesCollection?: IAddressItemCollection[] | null;
    isCheckoutFulfilled?: boolean;
    billingNewAddress?: IBillingAddressState;
    billingSelection?: IBillingSelectionState;
    mutateStateBillingSelectionSameAsDelivery?: (payload: boolean) => void;
    mutateStateBillingSelectionAddressId?: (payload: string) => void;
    mutateStateBillingSelectionAddNew?: () => void;
    mutateBillingStep?: (payload: boolean) => void;
    mutateStateNewAddressBilling?: (payload: IFormFieldMutate) => void;
}
