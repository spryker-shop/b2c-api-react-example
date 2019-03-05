import NumberFormat from 'react-number-format';
import { TAppCurrency } from '@interfaces/currency';

export interface SprykerNumberFormatInputProps {
    inputRef?: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { value: string } }) => void;
    currency: TAppCurrency;
    name: string;
    className: string;
    value: number;
    type: string;
}
