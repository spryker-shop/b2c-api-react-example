import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { WithRouter } from '@interfaces/common';

export interface IForgotPasswordPageProps extends WithStyles<typeof styles>, WithRouter {
    dispatch?: Function;
    routerGoBack: Function;
    forgotPasswordAction: Function;
    isLoading?: boolean;
}

export interface IForgotPasswordPageState {
    email: string;
}
