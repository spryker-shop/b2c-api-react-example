import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { IFormField, IFormSettings } from '@components/UI/SprykerForm/types';
import { NumberFormatProps } from 'react-number-format';
import { IInputIconProps } from './InputIcon/types';
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
    helperText?: string | null | React.ReactNode;
    inputType: IFormField['inputType'];
    iconProps?: {
        iconStartComponent?: IInputIconProps,
        iconEndComponent?: IInputIconProps
    };
    maskProps?: NumberFormatProps | null;
}
