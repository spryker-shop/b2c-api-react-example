import * as React from 'react';
import { GridSize } from '@material-ui/core/Grid';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { SprykerSelectProps } from '@application/components/UI/SprykerSelect';
import { sprykerFormStyles } from './sprykerFormStyles';
import { InputChangeEvent, BlurEvent, FormEvent } from '@interfaces/common';

export type TFormInputValue = string | number | boolean;

export interface IFormField {
    type: 'input' | 'select' | 'checkbox' | 'radio';
    inputType?: 'email' | 'password' | 'number' | 'range' | 'tel';
    inputName: string;
    inputValue: TFormInputValue;
    spaceNumber: GridSize;
    isRequired?: boolean;
    onChangeOwnHandler?: (event: InputChangeEvent) => void;
    onBlurOwnHandler?: (event: BlurEvent) => void;
    label?: React.ReactNode | string;
    isError?: boolean;
    menuItems?: SprykerSelectProps['menuItems'];
    menuItemFirst?: SprykerSelectProps['menuItemFirst'];
    title?: SprykerSelectProps['title'];
    radioItems?: IRadioItem[];
    isItemsInRow?: boolean;
    labelIcon?: JSX.Element | null;
    WrapperParentComponent?: React.SFC | null;
    WrapperChildComponent?: React.SFC | null;
}

export interface IFormSettings {
    formName: string;
    onChangeHandler?: (event: InputChangeEvent) => void;
    onBlurHandler?: (event: BlurEvent) => void;
    onSubmitHandler: (event: FormEvent) => void;
    fields: IFormField[][];
    controlsGroupClassName?: string;
}

export interface ISprykerFormProps extends WithStyles<typeof sprykerFormStyles> {
    form: IFormSettings;
    formClassName?: string;
    SubmitButton?: JSX.Element | null;
}

export interface IRadioItem {
    value: string;
    label: string | React.ReactNode;
    salutation?: React.ReactNode;
}
