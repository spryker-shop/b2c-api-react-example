import { TSalutationVariant } from '@interfaces/customer';
import { FormattedMessageTemplate } from '@helpers/formattedMessageTemplate';
import { IConfigInputStable } from '@interfaces/forms';

const SalutationVariantMrValue = 'Mr';
const SalutationVariantMrsValue = 'Mrs';
const SalutationVariantDrValue = 'Dr';
const SalutationVariantMsValue = 'Ms';

export const SalutationVariants: TSalutationVariant[] = [
    {
        value: SalutationVariantMrValue,
        name: FormattedMessageTemplate('salutation.variant.mr')
    },
    {
        value: SalutationVariantMsValue,
        name: FormattedMessageTemplate('salutation.variant.ms')
    },
    {
        value: SalutationVariantMrsValue,
        name: FormattedMessageTemplate('salutation.variant.mrs')
    },
    {
        value: SalutationVariantDrValue,
        name: FormattedMessageTemplate('salutation.variant.dr')
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

export const logoutSetTimeoutTime: number = 250;
