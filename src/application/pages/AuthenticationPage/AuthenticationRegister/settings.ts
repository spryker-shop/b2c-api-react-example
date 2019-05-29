import { IAuthenticationRegisterState } from './types';

export const initialState: IAuthenticationRegisterState = {
    fields: {
        salutation: {
            value: ' ',
            isError: false
        },
        firstName: {
            value: '',
            isError: false
        },
        lastName: {
            value: '',
            isError: false
        },
        email: {
            value: '',
            isError: false
        },
        password: {
            value: '',
            isError: false
        },
        confirmPassword: {
            value: '',
            isError: false
        },
        acceptedTerms: {
            value: false,
            isError: false
        }
    },
    isCartLoading: false,
    isFormValid: false
};
