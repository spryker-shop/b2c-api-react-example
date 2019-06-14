import * as React from 'react';
import NumberFormat from 'react-number-format';
import { SprykerNumberFormatInputProps as Props } from './types';

export const SprykerNumberFormatInput: React.FC<Props> = (props): JSX.Element => {
    const { inputRef, isAllowed, currency, ...other } = props;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(100);
    const currencyChar = formatter.substring(0, 1);

    return (
        <NumberFormat
            { ...other }
            getInputRef={ inputRef }
            thousandSeparator
            decimalScale={ 2 }
            fixedDecimalScale={ true }
            allowNegative={ false }
            prefix={ currencyChar }
            isAllowed={ values => isAllowed(values) }
        />
    );
};
