import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router-dom';
import { WithRouter } from '@interfaces/common';

export interface IAuthenticationPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isUserLoggedIn: boolean;
}

export interface IAuthenticationPageState {
    isShouldRedirect: boolean;
}
