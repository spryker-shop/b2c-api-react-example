import { IAddressItem } from '@interfaces/addresses';
import { ICountry } from '@interfaces/country';

import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

export interface AddressFormProps extends WithStyles<typeof styles> {
    customer: string;
    currentAddress: IAddressItem;
    countries: ICountry[];
    routerGoBack: Function;
    isLoading: boolean;
    isRejected: boolean;
    addressIdParam: string;
    isAppDataSet: boolean;
    isAddressExist: boolean;
    dispatch: Function;

    addAddress(payload: IAddressItem, customerId: string): void;

    updateAddress(addressId: string, customerId: string, payload: IAddressItem): void;

    getOneAddress: (customerId: string, addressId: string) => void;
}

export interface AddressFormState extends IAddressItem {
    submitted: boolean;

    [ key: string ]: string | number | boolean;
}
