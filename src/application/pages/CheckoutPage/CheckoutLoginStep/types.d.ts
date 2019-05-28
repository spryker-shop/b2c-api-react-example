import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface ICheckoutLoginStepProps extends WithStyles<typeof styles> {
    clearCheckoutDataForm: () => void;
    isUserLoggedIn: boolean;
}

export interface ICheckoutLoginStepState {
    isShouldRedirect: boolean;
}
