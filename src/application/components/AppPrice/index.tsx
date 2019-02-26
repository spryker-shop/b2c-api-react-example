import * as React from 'react';
import { connect } from './connect';
import { FormattedNumber } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import { priceTypeNameOriginal } from '@interfaces/product';
import { IAppPriceProps as Props } from './types';
import { styles } from './styles';

export const AppPriceBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        currency,
        value,
        specificCurrency,
        priceType,
        title,
        extraClassName,
        isStylesInherited,
        isMinus
    } = props;

    if (!currency) {
        return null;
    }
    const valueFormatted = value ? (value / 100) : 0;
    let priceClassName = '';
    if (priceType === priceTypeNameOriginal) {
        priceClassName = classes.strikethrough;
    } else {
        priceClassName = classes.defaultPrice;
    }

    let classNames = priceClassName;
    if (extraClassName) {
        classNames += ` ${extraClassName}`;
    }
    if (isStylesInherited) {
        classNames += ` ${classes.stylesInherited}`;
    }

    return (
        value || value === 0 ?
        <span className={classNames}>
            {title ? title : null}
            {isMinus ? <span>&nbsp; - &nbsp;</span> : null}
            <FormattedNumber
                value={valueFormatted}
                style="currency"
                currency={specificCurrency ? specificCurrency : currency}
            />
        </span> : null
    );
};

export const AppPrice = connect(withStyles(styles)(AppPriceBase));
