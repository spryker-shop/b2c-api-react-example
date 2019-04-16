import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ICheckoutLoginStep extends WithStyles<typeof styles> {
    isUserLoggedIn: boolean;
    clearCheckoutDataForm: () => void;
}
