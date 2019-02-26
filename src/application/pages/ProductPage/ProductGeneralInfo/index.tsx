import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { ProductAvailability } from './ProductAvailability';
import { AppPrice } from '@application/components/AppPrice';
import { priceTypeNameOriginal } from '@interfaces/product';
import { IProductGeneralInfoProps } from './types';
import { styles } from './styles';

export const ProductGeneralInfoBase: React.SFC<IProductGeneralInfoProps> = (props): JSX.Element => {
    const {
        classes,
        name = <FormattedMessage id={'no.name.title'} />,
        price = <FormattedMessage id={'no.price.title'} />, oldPrice, availability
    } = props;

    return (
        <div className={classes.root}>
            <Typography component="h1" color="inherit" className={classes.title}>
                {name}
            </Typography>
            <div className={classes.productInfo}>
                {(price || oldPrice)
                    ? <div className={classes.priceBlock}>
                        <Typography component="span" color="inherit" className={classes.price}>
                            <AppPrice value={price} isStylesInherited />
                        </Typography>
                        {oldPrice
                            ? (
                                <Typography component="span" className={classes.oldPrice}>
                                    <AppPrice value={oldPrice} priceType={priceTypeNameOriginal} isStylesInherited />
                                </Typography>
                            ) : null
                        }
                        <Typography component="span" className={classes.vat}>
                            <FormattedMessage id={'inc.vat.message'} />
                        </Typography>
                    </div>
                    : null
                }
                <ProductAvailability availability={availability} />
            </div>
        </div>
    );
};

export const ProductGeneralInfo = withStyles(styles)(ProductGeneralInfoBase);
