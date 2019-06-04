import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICustomerDataParsed } from '@interfaces/customer';
import { IAddressFormState } from '@interfaces/forms';

export interface ICheckoutThanksProps extends WithStyles<typeof styles> {
    orderId: string;
    isUserLoggedIn: boolean;
    anonymId: string;
    getCustomerCartsAction: (anonymId: string, isUserLoggedIn: boolean) => void;
    deliveryNewAddress: IAddressFormState;
    profile: ICustomerDataParsed;
}

export interface ICheckoutThanksState {
    shouldHideForm: boolean;
    email: string;
}
