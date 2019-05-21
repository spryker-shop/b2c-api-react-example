import { WithStyles } from '@material-ui/core';
import { IResetPasswordPayload } from '@interfaces/customer';
import { styles } from './styles';

export interface IResetPasswordPageProps extends WithStyles<typeof styles> {
    resetPasswordRequest?: (payload: IResetPasswordPayload) => void;
    restoreKey?: string | null;
    isLoading: boolean;
}

export interface IResetPasswordPageState {
    password: string;
    confirmPassword: string;
    submitted: boolean;
}
