import { IFormConfigInputStable } from '@interfaces/forms';

export const loginConfigInputStable: IFormConfigInputStable = {
    email: {
        isRequired: true,
        inputName: 'email',
        isEmail: true
    },
    password: {
        isRequired: true,
        inputName: 'password',
    }
};

export const registerConfigInputStable: IFormConfigInputStable = {
    ...loginConfigInputStable,
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
    confirmPassword: {
        isRequired: true,
        inputName: 'confirmPassword'
    },
    acceptedTerms: {
        isRequired: true,
        inputName: 'acceptedTerms'
    }
};
