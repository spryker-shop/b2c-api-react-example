import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { reduxify } from 'src/shared/components/hoc/Reduxify/index';
import { getAppCurrency } from '@stores/reducers/common/init';
import { priceTypeNameOriginal, TPriceTypeName } from 'src/shared/interfaces/product';
import { styles } from './styles';
import { IReduxOwnProps, IReduxStore } from 'src/shared/stores/reducers/types';
import { TAppCurrency } from 'src/shared/interfaces/currency';

interface AppPriceProps extends WithStyles<typeof styles> {
    currency: TAppCurrency;
    value: number | null;
    specificCurrency?: TAppCurrency;
    priceType?: TPriceTypeName;
    title?: string;
    extraClassName?: string;
    isStylesInherited?: boolean;
    isMinus?: boolean;
}

export const AppPriceBase: React.SFC<AppPriceProps> = props => {
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

export const AppPriceStyled = withStyles(styles)(AppPriceBase);

export const AppPrice = reduxify(
    (state: IReduxStore, ownProps: IReduxOwnProps) => {
        const currency: TAppCurrency = getAppCurrency(state, ownProps);

        return ({
            currency,
        });
    },
)(AppPriceStyled);
