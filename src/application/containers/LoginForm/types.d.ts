import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface ILoginFormProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isAuth?: boolean;
    handleSubmitLoginForm?: Function;
    getCustomerCart?: Function;
    isLoading?: boolean;
    redirectAfterLoginPath: string;
    isCartLoading?: boolean;
}

export interface ILoginFormState {
    username: string;
    password: string;
    isCartLoading: boolean;
}
