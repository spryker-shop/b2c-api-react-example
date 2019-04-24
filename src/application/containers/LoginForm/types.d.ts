import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { TCustomerPassword, TCustomerUsername } from '@interfaces/customer';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface ILoginFormProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isAuth?: boolean;
    handleSubmitLoginForm: Function;
    getCustomerCart: Function;
    isLoading: boolean;
    redirectAfterLoginPath: string;
}

export interface ILoginFormState {
    username: TCustomerUsername;
    password: TCustomerPassword;
}
