import { styles } from './styles';
import { ICountry } from '@interfaces/country';
import { InputChangeEvent } from '@interfaces/common';
import { ICheckoutAddressState } from '@interfaces/checkout';

export interface IAddressFormProps {
    countriesCollection: ICountry[];
    shouldShowEmail: boolean;
    formName: string;
    onFieldChangeHandler: (event: InputChangeEvent) => void;
    onFieldBlurHandler?: () => boolean;
    data: ICheckoutAddressState;
}
