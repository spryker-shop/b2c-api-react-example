import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

export interface IAuthenticationPageProps extends WithStyles<typeof styles>, RouteProps, Partial<RouteComponentProps> {
    isUserLoggedIn: boolean;
}

export interface IAuthenticationPageState {
    shouldRedirect: boolean;
}
