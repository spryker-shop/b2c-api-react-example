import * as React from 'react';
import { IInputMaskProps as Props, TTransformedOnChange } from './types';
import NumberFormat from 'react-number-format';

export const InputMask: React.FC<Props> = (props): JSX.Element => {
    const { inputRef, onChange, ...inputOtherProps } = props;
    const transformedOnChange: TTransformedOnChange = onChange;

    return (
        <NumberFormat
            {...inputOtherProps}
            getInputRef={inputRef}
            onValueChange={values => {
                transformedOnChange({
                    target: {
                        value: values.value,
                        name: inputOtherProps.name
                    },
                });
            }}
        />
    );
};
