import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { Price } from '@components/Price';
import { IProductGeneralInfoProps as Props } from './types';
import { styles } from './styles';

const ProductGeneralInfoComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        name = <FormattedMessage id={ 'no.name.title' } />,
        price = <FormattedMessage id={ 'no.price.title' } />,
        oldPrice,
        availability
    } = props;

    return (
        <div className={ classes.root }>
            <Typography component="span"
                className={ `
                    ${ classes.availableContainer }
                    ${ classes[availability ? 'available' : 'unavailable'] }`
                }
            >
                <FormattedMessage id={ availability ? 'available.title' : 'unavailable.title' } />
            </Typography>
            <Typography component="h1" variant="h3" color="textSecondary" className={ classes.title }>
                { name }
            </Typography>
            { price &&
                <div className={ classes.priceBlock }>
                    <Typography
                        component="span"
                        className={`${classes.price} ${oldPrice ? classes.newPrice : ''}`}
                    >
                        <Price value={ price } />
                    </Typography>
                    { oldPrice &&
                        <Typography component="span" className={ classes.oldPrice }>
                            <Price value={ oldPrice } isOriginal />
                        </Typography>
                    }
                    <Typography component="span" className={ classes.vat }>
                        <FormattedMessage id={ 'inc.vat.message' } />
                    </Typography>
                </div>
            }
        </div>
    );
};

export const ProductGeneralInfo = withStyles(styles)(ProductGeneralInfoComponent);
