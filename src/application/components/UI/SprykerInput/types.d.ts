import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { FormatInputValueFunction } from 'react-number-format';
import { IInputIconProps } from './InputIcon/types';
import { styles } from './styles';
import { BlurEvent, InputChangeEvent } from '@interfaces/common';

export interface IIconProps extends IInputIconProps {
    classes?: { [key: string]: string };
}

export interface ISprykerInputProps extends WithStyles<typeof styles> {
    inputValue: string | number | boolean;
    formName?: string;
    inputName: string;
    onChangeHandler: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
    label?: React.ReactNode | string;
    isError?: boolean;
    isRequired?: boolean;
    placeholder?: string | null | React.ReactNode;
    errorText?: string | null | React.ReactNode;
    inputType?: 'email' | 'password' | 'number' | 'range' | 'tel';
    iconProps?: {
        iconStartComponent?: IIconProps,
        iconEndComponent?: IIconProps
    };
    maskProps?: {
        mask?: string | string[],
        format?: string | FormatInputValueFunction,
        placeholder?: string
    } | null;
    autoFocus?: boolean;
}
