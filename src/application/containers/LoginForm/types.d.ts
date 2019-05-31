import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteProps } from 'react-router-dom';
import { WithRouter } from '@interfaces/common';
import { IConfigInputState } from '@interfaces/forms';

export interface ILoginFormProps extends WithStyles<typeof styles>, RouteProps, WithRouter {
    isAuth?: boolean;
    loginCustomerAction?: Function;
    getCustomerCartsAction?: Function;
    isLoading?: boolean;
    redirectAfterLoginPath: string;
    isCartLoading?: boolean;
}

export interface ILoginFormState {
    fields: {
        [index: string]: IConfigInputState;
        username: IConfigInputState;
        password: IConfigInputState;
    };
    isFormValid: boolean;
    isCartLoading: boolean;
}
