import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { ICountry } from '@interfaces/country';
import {
    IDeliveryAddressState,
    IDeliverySelectionState,
    IFormFieldMutate
} from '@interfaces/checkout';

export interface IDeliveryFormProps extends WithStyles<typeof styles> {
    isUserLoggedIn: boolean;
    addressesCollection: IAddressItemCollection[] | null;
    isAddressesCollectionExist: boolean;
    countriesCollection: ICountry[];
    deliveryNewAddress: IDeliveryAddressState;
    deliverySelection:  IDeliverySelectionState;
    mutateStateDeliverySelectionAddressId: (payload: string) => void;
    mutateDeliveryStep: (payload: boolean) => void;
    mutateStateDeliverySelectionAddNew: () => void;
    mutateStateNewAddressDelivery: (payload: IFormFieldMutate) => void;
}

export type TCurrentValueDeliverySelection = IAddressItemCollection['id'] | string | null;
