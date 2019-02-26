import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IFormField, IFormSettings } from '@application/components/UI/SprykerForm/types';
import { sprykerFormStyles } from '@application/components/UI/SprykerForm/sprykerFormStyles';

export interface IFieldTextInputProps extends WithStyles<typeof sprykerFormStyles> {
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
}
