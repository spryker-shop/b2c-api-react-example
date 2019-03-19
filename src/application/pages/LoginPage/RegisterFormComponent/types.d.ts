import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import {
    TCustomerEmail,
    TCustomerFirstName,
    TCustomerLastName, TCustomerPassword,
    TCustomerSalutation,
} from '@interfaces/customer';

export interface IRegisterFormProps extends WithStyles<typeof styles> {
    handleSubmit: Function;
}

export interface IRegisterFormState {
    salutation: TCustomerSalutation;
    firstName: TCustomerFirstName;
    lastName: TCustomerLastName;
    email: TCustomerEmail;
    password: TCustomerPassword;
    confirmPassword: TCustomerPassword;
    acceptedTerms: boolean;
}
