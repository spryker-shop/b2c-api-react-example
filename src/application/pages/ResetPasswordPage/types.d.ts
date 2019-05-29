import { WithStyles } from '@material-ui/core';
import { IResetPasswordPayload } from '@interfaces/customer';
import { styles } from './styles';
import { IConfigInputState } from '@interfaces/forms';
import { Location } from 'history';

export interface IResetPasswordPageProps extends WithStyles<typeof styles> {
    resetPasswordAction?: (payload: IResetPasswordPayload) => void;
    location: Location;
    isLoading: boolean;
}

export interface IResetPasswordPageState {
    fields: {
        [index: string]: IConfigInputState;
        password: IConfigInputState;
        confirmPassword: IConfigInputState;
    };
    isFormValid: boolean;
}
