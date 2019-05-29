import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { IDeliverySelectionState, IFormFieldMutate } from '@interfaces/checkout';
import { IAddressFormState } from '@interfaces/forms';

export interface IDeliveryFormProps {
    isUserLoggedIn?: boolean;
    addressesCollection?: IAddressItemCollection[] | null;
    deliveryNewAddress?: IAddressFormState;
    deliverySelection?:  IDeliverySelectionState;
    mutateStateDeliverySelectionAddressId?: (payload: string) => void;
    mutateDeliveryStep?: (payload: boolean) => void;
    mutateStateDeliverySelectionAddNew?: () => void;
    mutateStateNewAddressDelivery?: (payload: IFormFieldMutate) => void;
}

export type TCurrentValueDeliverySelection = IAddressItemCollection['id'] | string | null;
