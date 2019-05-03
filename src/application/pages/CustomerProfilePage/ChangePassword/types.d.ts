import { ICustomerDataParsed, ICustomerProfile, ICustomerProfilePassword } from '@interfaces/customer';
import { WithStyles } from '@material-ui/core';
import { styles } from '../styles';

export interface IChangePasswordProps extends Partial<ICustomerProfilePassword>, WithStyles<typeof styles> {
    customerData?: ICustomerDataParsed;
    customerReference: string;
    passwordUpdated?: boolean;
    updateCustomerPassword?: (customerReference: string, payload: ICustomerProfilePassword) => void;
}

export interface IChangePasswordState extends ICustomerProfilePassword {
    [index:string]: string | number | object | boolean;
}

export interface IProfileFieldInput {
    name: (keyof ICustomerProfile);
    value: string;
}
