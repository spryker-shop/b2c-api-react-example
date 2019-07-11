import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { IConfigInputState } from '@interfaces/forms';

export interface IAuthenticationRegisterProps extends RouteProps, Partial<RouteComponentProps> {
    isUserLoggedIn?: boolean;
    customerRegisterAction?: Function;
    getCustomerCartsAction?: (anonymId?: string, isUserLoggedIn?: boolean) => void;
    isLoading?: boolean;
    isCartLoading?: boolean;
    cartId?: string;
}

export interface IAuthenticationRegisterState {
    fields: {
        [index: string]: IConfigInputState;
        salutation: IConfigInputState;
        firstName: IConfigInputState;
        lastName: IConfigInputState;
        password: IConfigInputState;
        confirmPassword: IConfigInputState;
        acceptedTerms: IConfigInputState;
    };
    isFormValid: boolean;
    isCartLoading: boolean;
}
