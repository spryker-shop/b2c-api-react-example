import * as React from 'react';
import NumberFormat from 'react-number-format';

export type TTransformedOnChange = (event: { target: { value: string, name: string } }) => void;

export interface IInputMaskProps {
    inputRef: (instance: NumberFormat) => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    name: string;
}
