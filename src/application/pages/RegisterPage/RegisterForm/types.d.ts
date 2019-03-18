import {
    TCustomerEmail,
    TCustomerFirstName,
    TCustomerLastName,
    TCustomerPassword,
    TCustomerSalutation
} from '@interfaces/customer';
import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface IRegisterFormProps extends RouteProps, WithRouter {
    isAuth?: boolean;
    handleSubmitRegisterForm: Function;
    getCustomerCart: Function;
    isLoading: boolean;
}

export interface IRegisterFormState {
    salutation: TCustomerSalutation;
    firstName: TCustomerFirstName;
    lastName: TCustomerLastName;
    email: TCustomerEmail;
    password: TCustomerPassword;
    confirmPassword: TCustomerPassword;
    acceptedTerms: boolean;
}
