import * as React from 'react';
import { IInputMaskProps as Props } from './types';
import NumberFormat from 'react-number-format';

export const InputMask: React.SFC<Props> = (props): JSX.Element => {
    const { inputRef, onChange, ...other } = props;
    const { name } = other;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name
                    },
                });
            }}
        />
    );
};
