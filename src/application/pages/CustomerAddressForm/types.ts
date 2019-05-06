import { IAddressItem } from '@interfaces/addresses';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IConfigInputState } from '@interfaces/forms';
import { styles } from './styles';
import { WithRouter } from '@interfaces/common';

export interface ICustomerAddressFormProps extends WithStyles<typeof styles>, WithRouter {
    customer: string;
    currentAddress: IAddressItem;
    routerPush: Function;
    isLoading: boolean;
    addressIdParam: string;
    isAddressExist: boolean;
    addAddress: (payload: IAddressItem, customerId: string) => void;
    updateAddress: (addressId: string, customerId: string, payload: IAddressItem) => void;
    getOneAddress: (customerId: string, addressId: string) => void;
}

export interface ICustomerAddressFormState {
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
