import * as React from 'react';
import { IInputMaskProps as Props } from './types';
import NumberFormat from 'react-number-format';

export const InputMask: React.SFC<Props> = (props): JSX.Element => {
    const { inputRef, onChange, ...inputOtherProps } = props;

    return (
        <NumberFormat
            {...inputOtherProps}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name: inputOtherProps.name
                    },
                });
            }}
        />
    );
};
