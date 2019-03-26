import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { AppPrice } from '@application/components/AppPrice';
import { ICartTotalProps as Props } from './types';
import { styles } from './styles';

export const CartTotalBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes, totals, title } = props;

    return (
        <>
            { totals &&
                <>
                    <div className={ classes.row }>
                        <Typography component="span" variant="headline" color="textSecondary">
                            <FormattedMessage id={ 'word.subtotal.title' } />
                        </Typography>
                        <Typography component="span" variant="headline" color="textSecondary">
                            <AppPrice value={ totals.subtotal } isStylesInherited />
                        </Typography>
                    </div>

                    <div className={classes.row}>
                        <Typography component="span" variant="headline" color="textSecondary">
                            <FormattedMessage id={ 'word.tax.title' } />
                        </Typography>
                        <Typography component="span" variant="headline" color="textSecondary">
                            <AppPrice value={ totals.taxTotal || 0 } isStylesInherited />
                        </Typography>
                    </div>
                </>
            }
            { (totals && totals.discountTotal) &&
                <div className={ classes.row }>
                    <Typography component="span" variant="headline" color="textSecondary">
                        <FormattedMessage id={ 'word.discount.title' } />
                    </Typography>
                    <Typography component="span" variant="headline" color="textSecondary">
                        <AppPrice value={ totals.discountTotal } isStylesInherited />
                    </Typography>
                </div>
            }

            <div className={`${classes.row} ${classes.total}`}>
                <Typography component="span" className={ classes.totalText }>{ title }</Typography>
                <Typography component="span" className={ classes.totalText }>
                    { totals &&
                        <AppPrice value={ totals.grandTotal } isStylesInherited />
                    }
                </Typography>
            </div>
        </>
    );
};

export const CartTotal = withStyles(styles)(CartTotalBase);
