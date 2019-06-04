import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IConfigInputState } from '@interfaces/forms';
import { RouteComponentProps } from 'react-router-dom';

export interface IForgotPasswordPageProps extends WithStyles<typeof styles>, Partial<RouteComponentProps> {
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
