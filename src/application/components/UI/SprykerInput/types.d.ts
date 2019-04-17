import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IFormField, IFormSettings } from '@application/components/UI/SprykerForm/types';
import { NumberFormatProps } from 'react-number-format';
import { styles } from './styles';

export interface ISprykerInputProps extends WithStyles<typeof styles> {
    inputValue: IFormField['inputValue'];
    formName: IFormSettings['formName'];
    inputName: IFormField['inputName'];
    onChangeHandler: IFormSettings['onChangeHandler'] | IFormField['onChangeOwnHandler'];
    onBlurHandler?: IFormSettings['onBlurHandler'] | IFormField['onBlurOwnHandler'];
    label?: IFormField['label'];
    isError: IFormField['isError'];
    isRequired: IFormField['isRequired'];
    placeholderText?: string | null;
    inputType: IFormField['inputType'];
    icon?: React.ReactNode | null;
    iconPosition?: 'start' | 'end';
    maskProps: NumberFormatProps | null;
}
