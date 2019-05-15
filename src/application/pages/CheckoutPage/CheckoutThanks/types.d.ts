import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ICheckoutAddressState } from '@interfaces/checkout';

export interface ICheckoutThanksProps extends WithStyles<typeof styles> {
    orderId: string;
    isUserLoggedIn: boolean;
    anonymId: string;
    getGuestCart: (anonymId: string) => void;
    getCustomerCart: () => void;
    deliveryNewAddress: ICheckoutAddressState;
}

export interface ICheckoutThanksState {
    shouldHideForm: boolean;
}
