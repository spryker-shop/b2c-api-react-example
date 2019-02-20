import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

import { IAddressItem } from '@interfaces/addresses';

export interface IAddressesListProps extends WithStyles <typeof styles> {
    isLoading: boolean;
    customer: string | null;
    customerAddresses: IAddressItem[];
    deleteAddressHandler: Function;
    updatedAddressHandler: Function;
}
