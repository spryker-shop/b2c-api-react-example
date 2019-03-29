import { TSalutationVariant } from '@interfaces/customer';
import { FormattedMessageTemplate } from '@helpers/formattedMessageTemplate';

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

export const logoutSetTimeoutTime: number = 250;
