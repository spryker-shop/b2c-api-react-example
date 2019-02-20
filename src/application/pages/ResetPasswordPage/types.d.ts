import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TRouterMatchParam } from '@helpers/router/types';

export interface IResetPasswordPageProps extends WithStyles<typeof styles> {
    dispatch?: Function;
    restoreKey?: TRouterMatchParam;
}

export interface IResetPasswordPageState {
    password: string;
    confirmPassword: string;
    submitted: boolean;
}
