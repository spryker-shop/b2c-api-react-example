import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IDeliverySelectionState, IFormFieldMutate } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export interface IDeliveryFormProps {
    isUserLoggedIn?: boolean;
    addressesCollection?: IAddressItemCollection[];
    deliveryNewAddress?: IAddressFormState;
    deliverySelection?:  IDeliverySelectionState;
    mutateStateDeliverySelectionAddressIdAction?: (payload: string) => void;
    mutateDeliveryStepAction?: (payload: boolean) => void;
    mutateStateDeliverySelectionAddNewAction?: () => void;
    mutateStateNewAddressDeliveryAction?: (payload: IFormFieldMutate) => void;
}
