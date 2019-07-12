import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import { Price } from '@components/Price';
import { ITotalsBlockProps as Props } from './types';
import { IOrderDetailsExpenseItem } from '@interfaces/order';
import { styles } from './styles';

const TotalsBlockComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, totals, expenses, isMinus, shippingValue = 0 } = props;

    if (!totals) {
        return null;
    }

    const isShippingValueExist = Boolean(shippingValue) || (Boolean(expenses) && expenses.length > 1);

    return (
        <div className={ classes.wrapper }>
            <div className={ classes.row }>
                <Typography component="span" variant="h5" color="textSecondary">
                    <FormattedMessage id={ 'word.subtotal.title' } />
                </Typography>
                <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                    <Price value={ totals.subtotal } />
                </Typography>
            </div>

            <div className={classes.row}>
                <Typography component="span" variant="h5" color="textSecondary">
                    <FormattedMessage id={ 'word.tax.title' } />
                </Typography>
                <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                    <Price value={ totals.taxTotal || 0 } />
                </Typography>
            </div>

            { (Boolean(expenses)) &&
                expenses.map((item: IOrderDetailsExpenseItem, index: number) => (
                    <div className={ classes.row } key={`${item.name}${index}`}>
                        <Typography component="span" variant="h5" color="textSecondary">
                            <FormattedMessage id={ 'order.detail.shipment.title' } />
                        </Typography>
                        <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                            <Price value={ item.sumPrice || 0 } />
                        </Typography>
                    </div>
                ))
            }

            { isShippingValueExist &&
                <div className={classes.row}>
                    <Typography component="span" variant="h5" color="textSecondary">
                        <FormattedMessage id={ 'order.detail.shipment.total.title' } />
                    </Typography>
                    <Typography component="span" variant="h5" color="textSecondary" className={ classes.price }>
                        <Price value={ Boolean(shippingValue) ? shippingValue : totals.expenseTotal } />
                    </Typography>
                </div>
            }

            { Boolean(totals.discountTotal) &&
                <div className={ classes.row }>
                    <Typography component="span" variant="h5" color="textSecondary">
                        <FormattedMessage id={ 'word.discount.title' } />
                    </Typography>
                    <Typography component="span" variant="h5" className={`${classes.discountText} ${classes.price}`}>
                        <Price value={ totals.discountTotal } isMinus={ isMinus } />
                    </Typography>
                </div>
            }

            <div className={ classes.row }>
                <Typography component="span" className={ classes.totalText }>
                    <FormattedMessage id={ 'grand.total.title' } />
                </Typography>
                <Typography component="span" className={`${classes.totalText} ${classes.totalTextPrice}`}>
                    <Price value={ Boolean(shippingValue) ? shippingValue + totals.grandTotal : totals.grandTotal } />
                </Typography>
            </div>
        </div>
    );
};

TotalsBlockComponent.defaultProps = {
    isMinus: true
};

export const TotalsBlock = withStyles(styles)(TotalsBlockComponent);
