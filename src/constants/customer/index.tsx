import React from 'react';
import { TSalutationVariant } from '@interfaces/customer';
import { IConfigInputStable } from '@interfaces/forms';
import { IAddressConfigInputStable } from '@constants/checkout/types';
import { FormattedMessage } from 'react-intl';

const SalutationVariantMrValue = 'Mr';
const SalutationVariantMrsValue = 'Mrs';
const SalutationVariantDrValue = 'Dr';
const SalutationVariantMsValue = 'Ms';

export const SalutationVariants: TSalutationVariant[] = [
    {
        value: SalutationVariantMrValue,
        name: <FormattedMessage id={ 'salutation.variant.mr' } />
    },
    {
        value: SalutationVariantMsValue,
        name: <FormattedMessage id={ 'salutation.variant.ms' } />
    },
    {
        value: SalutationVariantMrsValue,
        name: <FormattedMessage id={ 'salutation.variant.mrs' } />
    },
    {
        value: SalutationVariantDrValue,
        name: <FormattedMessage id={ 'salutation.variant.dr' } />
    },
];

export const updateAccountConfigInputStable: {[key: string]: IConfigInputStable} = {
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

export const changePasswordConfigInputStable: {[key: string]: IConfigInputStable} = {
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

export const customerAddressConfigInputStable: IAddressConfigInputStable = {
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
