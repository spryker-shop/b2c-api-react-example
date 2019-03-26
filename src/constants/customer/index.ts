import { TSalutationVariant } from '@interfaces/customer';
import { FormattedMessageTemplate } from '@helpers/formattedMessageTemplate';

const SalutationVariantMrValue = 'Mr';
const SalutationVariantMrsValue = 'Mrs';
const SalutationVariantDrValue = 'Dr';
const SalutationVariantMsValue = 'Ms';

export const SalutationVariants: TSalutationVariant[] = [
    {
        value: SalutationVariantMrValue,
        label: FormattedMessageTemplate('salutation.variant.mr')
    },
    {
        value: SalutationVariantMsValue,
        label: FormattedMessageTemplate('salutation.variant.ms')
    },
    {
        value: SalutationVariantMrsValue,
        label: FormattedMessageTemplate('salutation.variant.mrs')
    },
    {
        value: SalutationVariantDrValue,
        label: FormattedMessageTemplate('salutation.variant.dr')
    },
];

export const logoutSetTimeoutTime: number = 250;
