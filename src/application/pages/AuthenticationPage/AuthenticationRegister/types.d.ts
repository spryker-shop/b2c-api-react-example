import { RouteProps } from 'react-router-dom';
import { WithRouter } from '@interfaces/common';
import { IConfigInputState } from '@interfaces/forms';

export interface IAuthenticationRegisterProps extends RouteProps, WithRouter {
    isAuth?: boolean;
    customerRegisterAction?: Function;
    getCustomerCartsAction?: Function;
    isLoading?: boolean;
    isCartLoading?: boolean;
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
