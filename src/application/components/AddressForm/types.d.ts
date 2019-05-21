import { styles } from './styles';
import { ICountry } from '@interfaces/country';
import { InputChangeEvent } from '@interfaces/common';
import { WithStyles } from '@material-ui/core';
import { IAddressFormState } from '@interfaces/forms';

export interface IAddressFormProps extends WithStyles<typeof styles> {
    countriesCollection: ICountry[];
    shouldShowEmail: boolean;
    formName: string;
    onFieldChangeHandler: (event: InputChangeEvent) => void;
    onFieldBlurHandler?: () => boolean;
    data: IAddressFormState;
    additionalActions: JSX.Element | null;
}
