import { IFormConfigInputStable } from '@interfaces/forms';

export const emailConfigInputStable: IFormConfigInputStable = {
    email: {
        isRequired: true,
        inputName: 'email',
        isEmail: true
    }
};

export const createPasswordConfigInputStable: IFormConfigInputStable = {
    password: {
        isRequired: true,
        inputName: 'password',
    },
    confirmPassword: {
        isRequired: true,
        inputName: 'confirmPassword'
    }
};

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
    ...emailConfigInputStable,
    ...createPasswordConfigInputStable,
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
    acceptedTerms: {
        isRequired: true,
        inputName: 'acceptedTerms'
    }
};
