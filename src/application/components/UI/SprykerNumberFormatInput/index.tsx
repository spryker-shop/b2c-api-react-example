import * as React from 'react';
import NumberFormat from 'react-number-format';
import { SprykerNumberFormatInputProps as Props } from './types';

export const SprykerNumberFormatInput: React.SFC<Props> = (props): JSX.Element => {
    const { inputRef, onChange, currency, ...other } = props;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(100);
    const currencyChar = formatter.substring(0, 1);

    return (
        <NumberFormat
            { ...other }
            getInputRef={ inputRef }
            onValueChange={ values => {
                onChange({
                    target: {
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            allowNegative={ false }
            prefix={ currencyChar }
        />
    );
};
