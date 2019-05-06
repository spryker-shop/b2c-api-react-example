import { ICustomerDataParsed, ICustomerProfilePassword } from '@interfaces/customer';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IConfigInputState } from '@interfaces/forms';

export interface IChangePasswordProps extends Partial<ICustomerProfilePassword>, WithStyles<typeof styles> {
    customerData?: ICustomerDataParsed;
    customerReference: string;
    passwordUpdated?: boolean;
    updateCustomerPassword?: (customerReference: string, payload: ICustomerProfilePassword) => void;
}

export interface IChangePasswordState {
    fields: {
        [index: string]: IConfigInputState;
        password: IConfigInputState;
        newPassword: IConfigInputState;
        confirmPassword: IConfigInputState;
    };
    isFormValid: boolean;
}
