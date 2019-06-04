import { IAddressItem } from '@interfaces/addresses';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IConfigInputState } from '@interfaces/forms';
import { styles } from './styles';
import { RouteComponentProps } from 'react-router-dom';

export interface ICustomerAddressProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
    customer: string;
    currentAddress: IAddressItem;
    isLoading: boolean;
    addressIdParam: string;
    isAddressExist: boolean;
    addAddressAction: (payload: IAddressItem, customerId: string) => void;
    updateAddressAction: (addressId: string, customerId: string, payload: IAddressItem) => void;
    getOneAddressAction: (customerId: string, addressId: string) => void;
}

export interface ICustomerAddressState {
    fields: {
        [index: string]: IConfigInputState;
        firstName?: IConfigInputState;
        lastName?: IConfigInputState;
        salutation?: IConfigInputState;
        address1?: IConfigInputState;
        address2?: IConfigInputState;
        address3?: IConfigInputState;
        zipCode?: IConfigInputState;
        city?: IConfigInputState;
        country?: IConfigInputState;
        company?: IConfigInputState;
        phone?: IConfigInputState;
        isDefaultShipping?: IConfigInputState;
        isDefaultBilling?: IConfigInputState;
    };
    isFormValid: boolean;
    isSubmitted: boolean;
}
