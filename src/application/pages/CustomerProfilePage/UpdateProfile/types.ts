import {
    ICustomerDataParsed,
    ICustomerProfileIdentity,
    TCustomerInputValue,
    ICustomerProfile,
    TCustomerReference
} from '@interfaces/customer';

import { WithStyles } from '@material-ui/core';
import { styles } from '../styles';

export interface IUpdateProfileProps extends WithStyles<typeof styles> {
    customerData?: ICustomerDataParsed;
    customerReference: TCustomerReference;
    updateCustomerData?: (customerReference: TCustomerReference, payload: ICustomerProfileIdentity) => void;
}

export interface IUpdateProfileState extends ICustomerProfileIdentity {
    [index:string]: string | number | object | boolean;
}

export interface IProfileFieldInput {
    name: (keyof ICustomerProfile);
    value: TCustomerInputValue;
}
