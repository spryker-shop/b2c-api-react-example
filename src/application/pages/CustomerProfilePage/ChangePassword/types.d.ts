import {
    ICustomerDataParsed,
    ICustomerProfile,
    ICustomerProfilePassword, TCustomerInputValue,
    TCustomerReference
} from '@interfaces/customer';

import { WithStyles } from '@material-ui/core';
import { styles } from '../styles';

export interface IChangePasswordProps extends ICustomerProfilePassword, WithStyles<typeof styles> {
    customerData: ICustomerDataParsed;
    customerReference: TCustomerReference;
    passwordUpdated: boolean;

    updateCustomerPassword(customerReference: TCustomerReference, payload: ICustomerProfilePassword): void;
}

export interface IChangePasswordState extends ICustomerProfilePassword {
    [index:string]: string | number | object | boolean;
}

export interface IProfileFieldInput {
    name: (keyof ICustomerProfile);
    value: TCustomerInputValue;
}
