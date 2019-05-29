import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { WithRouter } from '@interfaces/common';
import { IConfigInputState } from '@interfaces/forms';

export interface IForgotPasswordPageProps extends WithStyles<typeof styles>, WithRouter {
    dispatch?: Function;
    routerGoBack: Function;
    forgotPasswordAction: Function;
    isLoading?: boolean;
}

export interface IForgotPasswordPageState {
    fields: {
        [index: string]: IConfigInputState;
        email: IConfigInputState;
    };
    isFormValid: boolean;
}
