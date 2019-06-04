import NumberFormat, { NumberFormatValues } from 'react-number-format';

export interface SprykerNumberFormatInputProps {
    inputRef?: (instance: NumberFormat) => void;
    currency: string;
    name: string;
    className: string;
    value: number;
    type: 'text' | 'tel' | 'password';
    isAllowed: (values: NumberFormatValues) => boolean;
    onBlur?: () => void;
}
