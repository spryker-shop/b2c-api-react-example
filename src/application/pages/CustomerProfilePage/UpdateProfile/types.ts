import { ICustomerDataParsed, ICustomerProfileIdentity } from '@interfaces/customer';
import { IConfigInputState } from '@interfaces/forms';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IUpdateProfileProps extends WithStyles<typeof styles> {
    customerData?: ICustomerDataParsed;
    customerReference: string;
    updateCustomerData?: (customerReference: string, payload: ICustomerProfileIdentity) => void;
}

export interface IUpdateProfileState {
    fields: {
        [index: string]: IConfigInputState;
        salutation: IConfigInputState;
        firstName: IConfigInputState;
        lastName: IConfigInputState;
        email: IConfigInputState;
    };
    validForm: boolean;
}
