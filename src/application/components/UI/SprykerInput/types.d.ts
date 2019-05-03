import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { NumberFormatProps } from 'react-number-format';
import { IInputIconProps } from './InputIcon/types';
import { styles } from './styles';
import { BlurEvent, InputChangeEvent } from '@interfaces/common';

export interface ISprykerInputProps extends WithStyles<typeof styles> {
    inputValue: string | number | boolean;
    formName: string;
    inputName: string;
    onChangeHandler: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
    label?: React.ReactNode | string;
    isError?: boolean;
    isRequired?: boolean;
    helperText?: string | null | React.ReactNode;
    inputType?: 'email' | 'password' | 'number' | 'range' | 'tel';
    iconProps?: {
        iconStartComponent?: IInputIconProps,
        iconEndComponent?: IInputIconProps
    };
    maskProps?: NumberFormatProps | null;
}
