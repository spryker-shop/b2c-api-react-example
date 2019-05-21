import { TSalutationVariant } from '@interfaces/customer';
import { SalutationVariants } from '@constants/customer';

export const getSalutationToShow = (salutation: string): JSX.Element | string => {
    const salutationVariantData = SalutationVariants.filter((item: TSalutationVariant) => (item.value === salutation));

    return (salutationVariantData && salutationVariantData[0])
        ? salutationVariantData[0].name
        : salutation;
};
