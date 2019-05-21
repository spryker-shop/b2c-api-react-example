import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutThanksProps extends WithStyles<typeof styles> {
    orderId: string;
    isUserLoggedIn: boolean;
    anonymId: string;
    getGuestCart: (anonymId: string) => void;
    getCustomerCart: () => void;
    deliveryNewAddress: IAddressFormState;
    profile: ICustomerDataParsed | null;
}

export interface ICheckoutThanksState {
    shouldHideForm: boolean;
    email: string | null;
}
