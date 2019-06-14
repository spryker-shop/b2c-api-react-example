import { TSalutationVariant } from '@interfaces/customer';
import { salutationVariants } from '@constants/customer';

export const getSalutationToShow = (salutation: string): JSX.Element | string => {
    const salutationVariantData = salutationVariants.filter((item: TSalutationVariant) => (item.value === salutation));

    return (salutationVariantData && salutationVariantData[0]) ? salutationVariantData[0].name : salutation;
};
