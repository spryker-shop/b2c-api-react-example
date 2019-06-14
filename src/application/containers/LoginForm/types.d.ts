import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { IConfigInputState } from '@interfaces/forms';

export interface ILoginFormProps extends WithStyles<typeof styles>, RouteProps, Partial<RouteComponentProps> {
    isUserLoggedIn?: boolean;
    loginCustomerAction?: Function;
    getCustomerCartsAction?: (anonymId?: string, isUserLoggedIn?: boolean, isCreateCart?: boolean) => void;
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
