import * as React from 'react';
import { connect } from './connect';
import { FormattedNumber } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { IPriceProps as Props } from './types';
import { styles } from './styles';

const PriceComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, currency, value, specificCurrency, isOriginal, isMinus } = props;
    const isPriceExist = value || value === 0;

    if (!currency || !isPriceExist) {
        return null;
    }

    return (
        <span className={`${classes.price} ${ isOriginal ? classes.strikethrough : '' }`}>
            { isMinus && <span>&nbsp; -</span>  }
            <FormattedNumber
                value={ value / 100 }
                style="currency"
                currency={ specificCurrency ? specificCurrency : currency }
            />
        </span>
    );
};

export const Price = connect(withStyles(styles)(PriceComponent));
