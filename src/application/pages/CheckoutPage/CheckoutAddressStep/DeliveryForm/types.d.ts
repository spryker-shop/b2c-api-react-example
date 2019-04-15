import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICheckoutAddressState, IDeliverySelectionState, IFormFieldMutate } from '@interfaces/checkout';

export interface IDeliveryFormProps {
    isUserLoggedIn: boolean;
    addressesCollection: IAddressItemCollection[] | null;
    deliveryNewAddress: ICheckoutAddressState;
    deliverySelection:  IDeliverySelectionState;
    mutateStateDeliverySelectionAddressId: (payload: string) => void;
    mutateDeliveryStep: (payload: boolean) => void;
    mutateStateDeliverySelectionAddNew: () => void;
    mutateStateNewAddressDelivery: (payload: IFormFieldMutate) => void;
}

export type TCurrentValueDeliverySelection = IAddressItemCollection['id'] | string | null;
