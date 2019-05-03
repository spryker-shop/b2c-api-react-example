import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface IRegisterFormProps extends RouteProps, WithRouter {
    isAuth?: boolean;
    handleSubmitRegisterForm?: Function;
    getCustomerCart?: Function;
    isLoading?: boolean;
}

export interface IRegisterFormState {
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
}
