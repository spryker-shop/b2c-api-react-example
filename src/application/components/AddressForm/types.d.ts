import { styles } from './styles';
import { ICountry } from '@interfaces/country';
import { InputChangeEvent } from '@interfaces/common';
import { ICheckoutAddressState } from '@interfaces/checkout';
import { WithStyles } from '@material-ui/core';

export interface IAddressFormProps extends WithStyles<typeof styles> {
    countriesCollection: ICountry[];
    shouldShowEmail: boolean;
    formName: string;
    onFieldChangeHandler: (event: InputChangeEvent) => void;
    onFieldBlurHandler?: () => boolean;
    data: ICheckoutAddressState;
    additionalActions: JSX.Element | null;
}
