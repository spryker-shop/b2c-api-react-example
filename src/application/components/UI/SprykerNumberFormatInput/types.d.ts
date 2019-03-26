import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { TAppCurrency } from '@interfaces/currency';

export interface SprykerNumberFormatInputProps {
    inputRef?: (instance: NumberFormat | null) => void;
    currency: TAppCurrency;
    name: string;
    className: string;
    value: number;
    type: 'text' | 'tel' | 'password';
    isAllowed: (values: NumberFormatValues) => boolean;
}
