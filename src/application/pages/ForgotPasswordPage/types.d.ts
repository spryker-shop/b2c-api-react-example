import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router';

export interface IForgotPasswordPageProps extends WithStyles<typeof styles>, RouteProps {
    dispatch?: Function;
    routerGoBack: Function;
    sendForgotRequest: Function;
}

export interface IForgotPasswordPageState {
    email: string;
}
