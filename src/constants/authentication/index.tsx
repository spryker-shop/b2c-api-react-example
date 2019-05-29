import { IFormConfigInputStable } from '@interfaces/forms';

export const loginConfigInputStable: IFormConfigInputStable = {
    username: {
        isRequired: true,
        inputName: 'username',
        isEmail: true
    },
    password: {
        isRequired: true,
        inputName: 'password',
    }
};

export const registerConfigInputStable: IFormConfigInputStable = {
    salutation: {
        isRequired: true,
        inputName: 'salutation',
    },
    firstName: {
        isRequired: true,
        inputName: 'firstName',
    },
    lastName: {
        isRequired: true,
        inputName: 'lastName',
    },
    email: {
        isRequired: true,
        inputName: 'email',
        isEmail: true
    },
    password: {
        isRequired: true,
        inputName: 'password',
    },
    confirmPassword: {
        isRequired: true,
        inputName: 'confirmPassword'
    },
    acceptedTerms: {
        isRequired: true,
        inputName: 'acceptedTerms'
    }
};
