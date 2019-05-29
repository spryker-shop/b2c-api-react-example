import React from 'react';
import { TSalutationVariant } from '@interfaces/customer';
import { IFormConfigInputStable } from '@interfaces/forms';
import { FormattedMessage } from 'react-intl';

const salutationVariantMrValue: string = 'Mr';
const salutationVariantMrsValue: string = 'Mrs';
const salutationVariantDrValue: string = 'Dr';
const salutationVariantMsValue: string = 'Ms';

export const salutationVariants: TSalutationVariant[] = [
    {
        value: salutationVariantMrValue,
        name: <FormattedMessage id={ 'salutation.variant.mr' } />
    },
    {
        value: salutationVariantMsValue,
        name: <FormattedMessage id={ 'salutation.variant.ms' } />
    },
    {
        value: salutationVariantMrsValue,
        name: <FormattedMessage id={ 'salutation.variant.mrs' } />
    },
    {
        value: salutationVariantDrValue,
        name: <FormattedMessage id={ 'salutation.variant.dr' } />
    },
];

export const updateAccountConfigInputStable: IFormConfigInputStable = {
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
    }
};

export const changePasswordConfigInputStable: IFormConfigInputStable = {
    password: {
        isRequired: true,
        inputName: 'password',
    },
    newPassword: {
        isRequired: true,
        inputName: 'newPassword',
    },
    confirmPassword: {
        isRequired: true,
        inputName: 'confirmPassword'
    }
};

export const customerAddressConfigInputStable: IFormConfigInputStable = {
    firstName: {
        isRequired: true,
        inputName: 'firstName',
    },
    lastName: {
        isRequired: true,
        inputName: 'lastName',
    },
    salutation: {
        isRequired: true,
        inputName: 'salutation',
    },
    address1: {
        isRequired: true,
        inputName: 'address1',
    },
    address2: {
        isRequired: true,
        inputName: 'address2',
    },
    address3: {
        isRequired: false,
        inputName: 'address3',
    },
    zipCode: {
        isRequired: true,
        inputName: 'zipCode',
        minLength: 5
    },
    city: {
        isRequired: true,
        inputName: 'city',
    },
    country: {
        isRequired: true,
        inputName: 'country',
    },
    company: {
        isRequired: false,
        inputName: 'company',
    },
    phone: {
        isRequired: false,
        inputName: 'phone',
    },
    isDefaultShipping: {
        isRequired: false,
        inputName: 'isDefaultShipping',
    },
    isDefaultBilling: {
        isRequired: false,
        inputName: 'isDefaultBilling',
    }
};
