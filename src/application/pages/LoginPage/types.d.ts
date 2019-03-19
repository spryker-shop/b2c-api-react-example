import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface ILoginPageProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    dispatch?: Function;
    isAuth?: boolean;
    handleSubmitRegisterForm: Function;
    handleSubmitLoginForm: Function;
    getCustomerCart: Function;
}
