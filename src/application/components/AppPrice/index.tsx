import * as React from 'react';
import { connect } from './connect';
import { FormattedNumber } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { priceTypeNameOriginal } from '@interfaces/product';
import { IAppPriceProps as Props } from './types';
import { styles } from './styles';

const AppPriceComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, currency, value, specificCurrency, priceType, isMinus } = props;
    const isPriceExist = value || value === 0;

    if (!currency || !isPriceExist) {
        return null;
    }

    return (
        <span className={`${ priceType === priceTypeNameOriginal ? classes.strikethrough : '' }`}>
            { isMinus && <span>&nbsp; -</span>  }
            <FormattedNumber
                value={ value / 100 }
                style="currency"
                currency={ specificCurrency ? specificCurrency : currency }
            />
        </span>
    );
};

export const AppPrice = connect(withStyles(styles)(AppPriceComponent));
