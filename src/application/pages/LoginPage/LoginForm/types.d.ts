import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TCustomerPassword, TCustomerUsername } from '@interfaces/customer';

export interface ILoginFormProps extends WithStyles<typeof styles> {
    handleSubmit: Function;
}

export interface ILoginFormState {
    username: TCustomerUsername;
    password: TCustomerPassword;
    isSubmitting: boolean;
    isSubmitted: boolean;
}
